import { Module } from '@nestjs/common';

import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import WorkspaceUserModule from './workspace-user/workspace-user.module';
import ErdModule from './erd/erd.module';
import CollectionModule from './collection/collection.module';
import RequestApiModule from './api/api.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    WorkspaceUserModule,
    ErdModule,
    CollectionModule,
    RequestApiModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class ApiModule {}
