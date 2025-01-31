// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import TicketModule from './task/task.module';
import CsModule from './cs/cs.module';
import AdminModule from './admin/admin.module';
import VersionModule from './version/version.module';
import BoardModule from './board/board.module';
import InternalModule from './internal/internal.module';
import RunnerModule from './runner/runner.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    TicketModule,
    CsModule,
    AdminModule,
    VersionModule,
    BoardModule,
    InternalModule,
    RunnerModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class CoreModule {}
