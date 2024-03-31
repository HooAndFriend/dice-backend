// ** Nest Imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
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
import User from '../../user/domain/user.entity';

// ** Dto Imports
import RequestEpicUpdateDto from '../dto/epic/epic.update.dto';
import RequestTicketSaveDto from '../dto/ticket/ticket.save.dto';
import RequestTicketUpdateDto from '../dto/ticket/ticket.update.dto';
import RequestTicketCommentUpdateDto from '../dto/comment/comment.update.dto';
import RequestTicketCommentSaveDto from '../dto/comment/comment.save.dto';
import RequestTicketStateUpdateDto from '../dto/ticket/ticket.state.update.dto';
import RequestEpicSaveDto from '../dto/epic/epic.save.dto';
import CommonResponse from '@/src/global/dto/api.response';
import { WorkspaceRoleGuard } from '@/src/global/decorators/workspace-role/workspace-role.guard';
import {
  GetWorkspace,
  WorkspaceRole,
} from '@/src/global/decorators/workspace-role/workspace-role.decorator';
import RoleEnum from '@/src/global/enum/Role';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSettingSaveDto from '../dto/setting/setting.save.dto';
import RequestSettingUpdateDto from '../dto/setting/setting.update.dto';
import RequestEpicDueDateUpdateDto from '../dto/epic/epic-duedate.dto';
import RequestTicketDueDateUpdateDto from '../dto/ticket/ticket.duedate.update.dto';
import RequestEpicFindDto from '../dto/epic/epic.find.dto';

@ApiTags('Workspace Ticket')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/ticket', version: '1' })
export default class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 전체 조회' })
  @ApiResponse(TicketResponse.findAllTicket[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/')
  public async findAllTicket(@GetWorkspace() { id }: Workspace) {
    const { data, count } = await this.ticketService.findAllTicket(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Ticket을 전체 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 상세 조회' })
  @ApiResponse(TicketResponse.findOneTicket[200])
  @ApiResponse(TicketResponse.findOneTicket[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/detail/:ticketId')
  public async findOneTicket(@Param('ticketId') id: number) {
    const data = await this.ticketService.findOneTicket(id);
    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Finding Tickets',
      data: { data },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 생성' })
  @ApiBody({ type: RequestTicketSaveDto })
  @ApiResponse(TicketResponse.saveTicket[200])
  @ApiResponse(TicketResponse.saveTicket[400])
  @ApiResponse(TicketResponse.saveTicket[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/')
  public async saveTicket(
    @Body() dto: RequestTicketSaveDto,
    @GetUser() user: User,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.ticketService.saveTicket(dto, user, workspace);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 수정' })
  @ApiBody({ type: RequestTicketUpdateDto })
  @ApiResponse(TicketResponse.updateTicket[200])
  @ApiResponse(TicketResponse.updateTicket[400])
  @ApiResponse(TicketResponse.updateTicket[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/')
  public async updateTicket(
    @Body() dto: RequestTicketUpdateDto,
    @GetUser() user: User,
  ) {
    await this.ticketService.updateTicket(dto, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 수정합니다.',
    });
  }
  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET Due Date 수정' })
  @ApiBody({ type: RequestTicketDueDateUpdateDto })
  @ApiResponse(TicketResponse.updateTicketDueDate[200])
  @ApiResponse(TicketResponse.updateTicketDueDate[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/dueDate')
  public async updateTicketDueDate(@Body() dto: RequestTicketDueDateUpdateDto) {
    await this.ticketService.updateTicketDueDate(dto);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket due date를 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 삭제' })
  @ApiResponse(TicketResponse.deleteTicket[200])
  @ApiResponse(TicketResponse.deleteTicket[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/:ticketId')
  public async deleteTicket(@Param('ticketId') id: number) {
    await this.ticketService.deleteTicket(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket을 삭제합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'TICKET 상태변경' })
  @ApiBody({ type: RequestTicketStateUpdateDto })
  @ApiResponse(TicketResponse.updateTicketState[200])
  @ApiResponse(TicketResponse.updateTicketState[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/state/:ticketId')
  public async updateTicketState(@Body() dto: RequestTicketStateUpdateDto) {
    await this.ticketService.updateTicketState(dto);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Ticket 상태를 변경합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 리스트 조회' })
  @ApiResponse(TicketResponse.findAllEpic[200])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/epic')
  public async findAllEpic(
    @GetWorkspace() { id }: Workspace,
    @Query(ValidationPipe) query: RequestEpicFindDto,
  ) {
    const { data, count } = await this.ticketService.findAllEpic(id, query);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Epic을 전체 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 상세조회' })
  @ApiResponse(TicketResponse.findOneEpic[200])
  @ApiResponse(TicketResponse.findOneEpic[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/epic/detail/:epicId')
  public async findOneEpic(@Param('epicId') id: number) {
    const { data, count } = await this.ticketService.findOneEpic(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Epic을 상세 조회합니다.',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 생성' })
  @ApiBody({ type: RequestEpicSaveDto })
  @ApiResponse(TicketResponse.saveEpic[200])
  @ApiResponse(TicketResponse.saveEpic[400])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/epic')
  public async saveEpic(
    @Body() dto: RequestEpicSaveDto,
    @GetUser() user: User,
    @GetWorkspace() workspace: Workspace,
  ) {
    await this.ticketService.saveEpic(dto, workspace, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 생성합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 수정' })
  @ApiBody({ type: RequestEpicUpdateDto })
  @ApiResponse(TicketResponse.updateEpic[200])
  @ApiResponse(TicketResponse.updateEpic[400])
  @ApiResponse(TicketResponse.updateEpic[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/epic')
  public async updateEpic(@Body() dto: RequestEpicUpdateDto) {
    await this.ticketService.updateEpic(dto);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC Due Date 수정' })
  @ApiBody({ type: RequestEpicDueDateUpdateDto })
  @ApiResponse(TicketResponse.updateDueDateEpic[200])
  @ApiResponse(TicketResponse.updateDueDateEpic[400])
  @ApiResponse(TicketResponse.updateDueDateEpic[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/epic/dueDate')
  public async updateDueDateEpic(@Body() dto: RequestEpicDueDateUpdateDto) {
    await this.ticketService.updateEpicDueDate(dto);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 수정합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'EPIC 삭제' })
  @ApiResponse(TicketResponse.deleteEpic[200])
  @ApiResponse(TicketResponse.deleteEpic[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/epic/:epicId')
  public async deleteEpic(@Param('epicId') id: number) {
    await this.ticketService.deleteEpic(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Epic을 삭제합니다.',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 조회' })
  @ApiResponse(TicketResponse.findComment[200])
  @ApiResponse(TicketResponse.findComment[404])
  @WorkspaceRole(RoleEnum.VIEWER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Get('/comment/:ticketId')
  public async findComment(@Param('ticketId') id: number) {
    const [data, count] = await this.ticketService.findComment(id);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Comment',
      data: { data, count },
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 생성' })
  @ApiBody({ type: RequestTicketCommentSaveDto })
  @ApiResponse(TicketResponse.saveComment[200])
  @ApiResponse(TicketResponse.saveComment[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/comment')
  public async saveComment(
    @Body() dto: RequestTicketCommentSaveDto,
    @GetUser() user: User,
  ) {
    await this.ticketService.saveComment(dto, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Comment',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 수정' })
  @ApiBody({ type: RequestTicketCommentUpdateDto })
  @ApiResponse(TicketResponse.updateComment[200])
  @ApiResponse(TicketResponse.updateComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/comment')
  public async updateComment(
    @Body() dto: RequestTicketCommentUpdateDto,
    @GetUser() user: User,
  ) {
    await this.ticketService.updateComment(dto, user);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update Comment',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'COMMENT 삭제' })
  @ApiResponse(TicketResponse.deleteComment[200])
  @ApiResponse(TicketResponse.deleteComment[404])
  @WorkspaceRole(RoleEnum.WRITER)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Delete('/comment/:commentId')
  public async deleteComment(@Param('commentId') id: number) {
    await this.ticketService.deleteComment(id);
    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Delete Comment',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiHeader({ name: 'workspace-code', required: true })
  @ApiOperation({ summary: 'Setting 생성' })
  @ApiResponse(TicketResponse.saveSetting[200])
  @ApiResponse(TicketResponse.saveSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Post('/setting')
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
  @ApiResponse(TicketResponse.updateSetting[200])
  @ApiResponse(TicketResponse.updateSetting[404])
  @WorkspaceRole(RoleEnum.ADMIN)
  @UseGuards(WorkspaceRoleGuard)
  @UseGuards(JwtAccessGuard)
  @Patch('/setting')
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
  @Delete('/setting/:settingId')
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
  @Get('/setting')
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
  @Get('/setting/:settingId')
  public async findSetting(@Param('settingId') id: number) {
    const setting = await this.ticketService.findSettingById(id);
    return CommonResponse.createResponse({
      data: setting,
      message: 'Find Setting',
      statusCode: 200,
    });
  }
}
