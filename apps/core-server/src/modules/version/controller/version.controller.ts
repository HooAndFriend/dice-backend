// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

// ** Module Imports
import VersionService from '../service/version.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import CommonResponse from '@/src/global/dto/api.response';
import { VersionResponse } from '@/src/global/response/version.response';
import VersionTypeEnum from '../domain/version-type.enum';

// ** Dto Imports

@ApiTags('Version')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/admin/version', version: '1' })
export default class VersionController {
  constructor(private readonly versionService: VersionService) {}

  
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '최신 Version 조회' })
  @ApiResponse(VersionResponse.findVersion[200])
  @ApiResponse(VersionResponse.findVersion[400])
  @ApiQuery({ name: 'type', enum: VersionTypeEnum })
  @UseGuards(JwtAccessGuard)
  @Get('/lastest/:type')
  public async fidnLastestVersion(@Query('type') type: VersionTypeEnum) {
    const LatestVersion = await this.versionService.findLastestVesrion(type);

    return CommonResponse.createResponse({
      data: LatestVersion,
      statusCode: 200,
      message: '가장 최신 Version을 조회합니다.',
    });
  }
}
