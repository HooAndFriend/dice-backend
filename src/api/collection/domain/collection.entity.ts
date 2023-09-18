// ** Typeorm Imports
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import Workspace from 'src/api/workspace/domain/workspace.entity';

@Entity({ name: 'TB_WORKSPACE_COLLECTION' })
export default class Collection extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.collection)
  workspace: Workspace;
}
