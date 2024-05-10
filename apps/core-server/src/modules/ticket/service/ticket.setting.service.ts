// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import TicketSettingRepository from '../repository/ticket.setting.repository';

// ** Typeorm Imports
import { Transactional } from 'typeorm-transactional';

// ** enum, dto, entity, types Imports
import { BadRequestException, NotFoundException } from '@hi-dice/common';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSettingUpdateDto from '../dto/setting/setting.update.dto';

@Injectable()
export default class TicketSettingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ticketSettingRepository: TicketSettingRepository,
  ) {}

  private logger = new Logger(TicketSettingService.name);

  /**
   * Find Epic By Id
   * @param epicId
   * @returns
   */
  public async findTicketSettingById(ticketSettingId: number) {
    const ticketSetting = await this.ticketSettingRepository.findOne({
      where: { id: ticketSettingId },
    });

    if (!ticketSetting) {
      throw new NotFoundException('Not Found Ticket Setting');
    }

    return ticketSetting;
  }

  /**
   * Existed Setting Type
   * @param type
   * @param workspaceId
   */
  public async existedTicketSetting(name: string, workspaceId: number) {
    const ticketSetting = await this.ticketSettingRepository.exist({
      where: { name, workspace: { id: workspaceId } },
    });

    if (ticketSetting) {
      throw new BadRequestException('Already exist setting');
    }
  }

  /**
   * Update Ticket Setting
   * @param dto
   */
  @Transactional()
  public async updateTicketSetting(
    dto: RequestSettingUpdateDto,
    workspace: Workspace,
  ) {
    for await (const item of dto.data) {
      if (item.settingId) {
        const ticketSetting = await this.findTicketSettingById(item.settingId);
        ticketSetting.changeTicketSetting(item);

        await this.ticketSettingRepository.save(ticketSetting);

        continue;
      }

      await this.ticketSettingRepository.save(
        this.ticketSettingRepository.create({
          name: item.name,
          description: item.description,
          type: item.type,
          workspace,
        }),
      );
    }
  }
}
