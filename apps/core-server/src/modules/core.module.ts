import { Module } from '@nestjs/common';

import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import WorkspaceUserModule from './workspace-user/workspace-user.module';
import TeamModule from './team/team.module';
import TeamUserModule from './team-user/team-user.module';
import QaModule from './qa/qa.module';
import WorkspaceFunctionModule from './workspace-function/workspace-function.module';
import TicketModule from './ticket/ticket.module';
import CsModule from './cs/cs.module';
import AdminModule from './admin/admin.module';
import VersionModule from './version/version.module';
import AuthorityModule from './authority/authority.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    WorkspaceUserModule,
    WorkspaceFunctionModule,
    TeamModule,
    TeamUserModule,
    QaModule,
    TicketModule,
    CsModule,
    AdminModule,
    VersionModule,
    AuthorityModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class CoreModule {}
