// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Passport Imports
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// ** Dto, Type, enum Import
import { JwtPayload } from 'src/types';

// ** Custom Module Imports
import AuthService from '../service/user.service';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(payload: JwtPayload): Promise<any> {
    return null;
    // return await this.authService.findUserByJwt(payload);
  }
}
