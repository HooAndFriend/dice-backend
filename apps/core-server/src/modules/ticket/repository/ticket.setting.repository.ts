// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import Ticket from '../domain/ticket.entity';
import TicketSetting from '../domain/ticket.setting.entity';

@CustomRepository(Ticket)
export default class TicketSettingRepository extends Repository<TicketSetting> {
  public async findSettingByWorkspaceId(workspaceId: number) {
    const querybuilder = this.createQueryBuilder('setting')
      .select([
        'setting.id',
        'setting.color',
        'setting.type',
        'setting.description',
        'workspace.id',
        'admin.id',
      ])
      .leftJoin('setting.workspace', 'workspace')
      .leftJoin('ticket.admin', 'admin')
      .where('setting.workspace = :workspaceId', { workspaceId });
    return await querybuilder.getManyAndCount();
  }

  public async findOneByTypeAndWorkspaceId(type: string, workspaceId: number) {
    const querybuilder = this.createQueryBuilder('setting')
      .select([
        'setting.id',
        'setting.color',
        'setting.type',
        'setting.description',
        'workspace.id',
        'admin.id',
      ])
      .leftJoin('setting.workspace', 'workspace')
      .leftJoin('ticket.admin', 'admin')
      .where('setting.workspace = :workspaceId', { workspaceId })
      .andWhere('setting.type = :type', { type })
      .getOne();
  }

  public async findSettingById(settingId: number) {
    const querybuilder = this.createQueryBuilder('setting')
      .select([
        'setting.id',
        'setting.color',
        'setting.type',
        'setting.description',
        'workspace.id',
        'admin.id',
      ])
      .leftJoin('setting.workspace', 'workspace')
      .leftJoin('ticket.admin', 'admin')
      .where('setting.id = :settingId', { settingId });
    return await querybuilder.getOne();
  }
}
