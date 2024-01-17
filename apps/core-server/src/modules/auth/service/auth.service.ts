// ** Nest Imports
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import UserRepository from '../../user/repository/user.repository';
import { DataSource } from 'typeorm';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';

// ** Utils Imports
import * as bcrypt from 'bcryptjs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

// ** enum, dto, entity, types Imports
import { InternalServerErrorException } from '../../../global/exception/CustomException';
import { JwtPayload } from '../../../global/types';
import CommonResponse from '../../../global/dto/api.response';
import RequestSocialUserLoginDto from '../dto/user.social.login.dto';
import RequestSocialUserSaveDto from '../dto/user.social.save.dto';
import RequestDiceUserLoginDto from '../dto/user.dice.login.dto';
import RequestDiceUserSaveDto from '../dto/user.dice.save.dto';
import { UserType } from '../../../global/enum/UserType.enum';
import User from '../../user/domain/user.entity';
import TeamUserRepository from '../../team-user/repository/team-user.repository';
import TeamRepository from '../../team/repository/team.repository';
import Role from '@/src/global/enum/Role';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly dataSource: DataSource,
    private readonly teamUserRepository: TeamUserRepository,
    private readonly teamRepository: TeamRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  private logger = new Logger();

  /**
   * 소셜 회원가입
   * @param dto
   * @returns
   */
  public async saveSocialUser(dto: RequestSocialUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { token: dto.token },
    });

    if (findUser) {
      return CommonResponse.createBadRequestException(
        '이미 회원가입한 유저 입니다.',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveUser = await queryRunner.manager.save(
        this.userRepository.create({
          token: dto.token,
          nickname: dto.nickname,
          type: dto.type,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
        }),
      );

      await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          comment: '',
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          user: saveUser,
        }),
      );

      if (dto.uuid) {
        const redisValue = await this.getTeamRedisValue(dto.email, dto.uuid);

        if (redisValue) {
          const findTeam = await this.teamRepository.findOne({
            where: { uuid: dto.uuid },
          });

          if (findTeam) {
            await queryRunner.manager.save(
              this.teamUserRepository.create({
                team: findTeam,
                user: saveUser,
                role: this.getRole(redisValue),
              }),
            );
          }
        }
      }

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: saveUser.id });

      return CommonResponse.createResponse({
        statusCode: 200,
        message: '회원가입 했습니다.',
        data: {
          token,
          user: {
            nickname: saveUser.nickname,
            profile: saveUser.profile,
            email: saveUser.email,
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }

  public async loginSocialUser(dto: RequestSocialUserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { token: dto.token },
    });

    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }

    const token = this.generateToken({ id: findUser.id });

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '로그인에 성공했습니다.',
      data: {
        token,
        user: {
          nickname: findUser.nickname,
          profile: findUser.profile,
          email: findUser.email,
        },
      },
    });
  }

  public async loginDiceUser(dto: RequestDiceUserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }

    const result = await bcrypt.compare(dto.password, findUser.password);

    if (!result) {
      return CommonResponse.createBadRequestException(
        '비밀번호가 맞지 않습니다.',
      );
    }

    const token = this.generateToken({ id: findUser.id });

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '로그인에 성공했습니다.',
      data: {
        token,
        user: {
          nickname: findUser.nickname,
          profile: findUser.profile,
          email: findUser.email,
        },
      },
    });
  }

  /**
   * 다이스 회원가입
   * @param dto
   * @returns
   */
  public async saveDiceUser(dto: RequestDiceUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (findUser) {
      return CommonResponse.createBadRequestException(
        '이미 회원가입한 유저 입니다.',
      );
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveUser = await queryRunner.manager.save(
        this.userRepository.create({
          email: dto.email,
          password: hash,
          nickname: dto.nickname,
          type: UserType.DICE,
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
        }),
      );

      if (dto.uuid) {
        const redisValue = await this.getTeamRedisValue(dto.email, dto.uuid);

        if (redisValue) {
          const findTeam = await this.teamRepository.findOne({
            where: { uuid: dto.uuid },
          });

          if (findTeam) {
            await queryRunner.manager.save(
              this.teamUserRepository.create({
                team: findTeam,
                user: saveUser,
                role: this.getRole(redisValue),
              }),
            );
          }
        }
      }

      await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.nickname,
          comment: '',
          profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
          user: saveUser,
        }),
      );

      await queryRunner.commitTransaction();

      const token = this.generateToken({ id: saveUser.id });

      return CommonResponse.createResponse({
        statusCode: 200,
        message: '회원가입 했습니다.',
        data: {
          token,
          user: {
            nickname: saveUser.nickname,
            profile: saveUser.profile,
            email: saveUser.email,
          },
        },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }

  public async reissueToken(user: User) {
    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );
    return CommonResponse.createResponse({
      statusCode: 200,
      message: '토큰을 재발급합니다.',
      data: { accessToken },
    });
  }

  public generateToken(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    };
  }

  public async findUserByJwt({ id }: JwtPayload): Promise<any> {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      return CommonResponse.createNotFoundException('유저를 찾을 수 없습니다.');
    }
    return findUser;
  }

  public async findRefreshToken({ id }: JwtPayload) {
    return await this.userRepository.findOne({ where: { id } });
  }

  /**
   * Get Redis Value
   * @param email
   * @param uuid
   * @returns
   */
  private async getTeamRedisValue(email: string, uuid: string) {
    return await this.redis.get(`${email}&&${uuid}`);
  }

  /**
   * Parse Redis Role
   * @param redisValue
   * @returns
   */
  private getRole(redisValue: string) {
    const role = redisValue.split('&&')[1];

    if (role === 'VIEWER') return Role.VIEWER;
    if (role === 'WRITER') return Role.WRITER;

    return Role.ADMIN;
  }
}