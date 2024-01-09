// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import WorkspaceUser from '../domain/workspace-user.entity';

@CustomRepository(WorkspaceUser)
export default class WorkspaceUserRepository extends Repository<WorkspaceUser> {
  /**
   * Find Workspace User List
   * @param workspaceId
   * @returns
   */
  public async findWorkspaceUserList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser')
      .select([
        'workspaceUser.id',
        'workspaceUser.role',
        'teamUser.id',
        'user.nickname',
        'user.email',
      ])
      .leftJoin('workspaceUser.teamUser', 'teamUser')
      .leftJoin('teamUser.user', 'user')
      .where('workspaceUser.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getManyAndCount();
  }
}
