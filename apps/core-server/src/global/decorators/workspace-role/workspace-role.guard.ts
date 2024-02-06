import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WORKSPACE_ROLE_KEY } from './workspace-role.decorator';
import WorkspaceUserRepository from '@/src/modules/workspace-user/repository/workspace-user.repository';
import RoleEnum from '../../enum/Role';

@Injectable()
export class WorkspaceRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<string>(
      WORKSPACE_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const { user, headers } = context.switchToHttp().getRequest();
    const teamCode = headers['workspace-code'];

    const workspaceUser = await this.workspaceUserRepository.findOne({
      where: {
        workspace: { uuid: teamCode },
        teamUser: { user: { id: user.id } },
      },
      relations: ['workspace'],
    });

    if (!workspaceUser) return false;

    headers['workspace'] = workspaceUser.workspace;

    if (requiredRole === RoleEnum.ADMIN) {
      return workspaceUser.role === requiredRole;
    }

    if (requiredRole === RoleEnum.WRITER) {
      return (
        workspaceUser.role === requiredRole ||
        workspaceUser.role === RoleEnum.ADMIN
      );
    }

    if (requiredRole === RoleEnum.VIEWER) {
      return (
        workspaceUser.role === requiredRole ||
        workspaceUser.role === RoleEnum.ADMIN ||
        workspaceUser.role === RoleEnum.WRITER
      );
    }
  }
}