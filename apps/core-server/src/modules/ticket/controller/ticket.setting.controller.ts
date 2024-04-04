// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

// ** Module Imports
import TicketService from '../service/ticket.service';

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// ** Response Imports
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from '../../../global/response/common';
import { TicketResponse } from '@/src/global/response/ticket.response';

// ** Utils Imports
import JwtAccessGuard from '../../auth/passport/auth.jwt-access.guard';
import { GetUser } from '../../../global/decorators/user/user.decorators';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';

// ** Dto Imports
import User from '../../user/domain/user.entity';
import CommonResponse from '@/src/global/dto/api.response';
import RoleEnum from '@/src/global/enum/Role';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSettingSaveDto from '../dto/setting/setting.save.dto';
import RequestSettingUpdateDto from '../dto/setting/setting.update.dto';

@ApiTags('Ticket Setting')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket/setting', version: '1' })
export default class TicketSettingController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 생성' })
  @ApiBody({ type: RequestSettingSaveDto })
  @ApiResponse(TicketResponse.saveSetting[200])
  @ApiResponse(TicketResponse.saveSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveSetting(
    @GetWorkspace() workspace: Workspace,
    @GetUser() user: User,
    @Body() dto: RequestSettingSaveDto,
  ) {
    await this.ticketService.saveSetting(dto, workspace, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 수정' })
  @ApiBody({ type: RequestSettingUpdateDto })
  @ApiResponse(TicketResponse.updateSetting[200])
  @ApiResponse(TicketResponse.updateSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateSetting(
    @GetWorkspace() workspace: Workspace,
    @Body() dto: RequestSettingUpdateDto,
  ) {
    await this.ticketService.updateSetting(dto, workspace);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 삭제' })
  @ApiResponse(TicketResponse.deleteSetting[200])
  @ApiResponse(TicketResponse.deleteSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:settingId')
  public async deleteSetting(@Param('settingId') id: number) {
    await this.ticketService.deleteSetting(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Setting',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 전체 조회' })
  @ApiResponse(TicketResponse.findSetting[200])
  @ApiResponse(TicketResponse.findSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAllSetting(@GetWorkspace() { id }: Workspace) {
    const [data, count] = await this.ticketService.findAllSetting(id);

    return CommonResponse.createResponse({
      data: { data, count },
      message: 'Find Settings',
      statusCode: 200,
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 단일 조회' })
  @ApiResponse(TicketResponse.findOneSetting[200])
  @ApiResponse(TicketResponse.findOneSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/:settingId')
  public async findSetting(@Param('settingId') id: number) {
    const setting = await this.ticketService.findSettingById(id);
    return CommonResponse.createResponse({
      data: setting,
      message: 'Find Setting',
      statusCode: 200,
    });
  }
}