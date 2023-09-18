// ** Typeorm Imports
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import Workspace from 'src/api/workspace/domain/workspace.entity';

@Entity({ name: 'TB_WORKSPACE_API' })
export default class Api extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.erd)
  workspace: Workspace;
}
