// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from 'src/repository/typeOrmEx.module';
import WorkspaceUserService from './service/workspace-user.service';
import WorkspaceUserController from './controller/workspace-user.controller';
import WorkspaceUser from './domain/workspace-user.entity';
import WorkspaceUserRepository from './repository/workspace-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkspaceUser]),
    TypeOrmExModule.forCustomRepository([WorkspaceUserRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [WorkspaceUserController],
  providers: [WorkspaceUserService],
})
export default class WorkspaceUserModule {}