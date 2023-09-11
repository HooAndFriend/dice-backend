// ** Nest Imports
import { Controller, Post, Body } from '@nestjs/common';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

// ** enum, dto, entity, types Imports
import RequestUserSaveDto from '../dto/user.save.dto';
import { AuthResponse } from 'src/response/auth.response';
import RequestUserLoginDto from '../dto/user.login.dto';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: RequestUserSaveDto })
  @ApiResponse(AuthResponse.saveUser[200])
  @ApiResponse(AuthResponse.saveUser[400])
  @Post('/user')
  public async saveUser(@Body() dto: RequestUserSaveDto) {
    return await this.authService.saveUser(dto);
  }

  @ApiOperation({ summary: '유저 로그인' })
  @ApiBody({ type: RequestUserLoginDto })
  @ApiResponse(AuthResponse.loginUser[200])
  @ApiResponse(AuthResponse.loginUser[404])
  @Post('/')
  public async loginUser(@Body() dto: RequestUserLoginDto) {
    return await this.authService.loginUser(dto);
  }
}
