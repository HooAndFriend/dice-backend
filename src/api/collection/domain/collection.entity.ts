// ** Typeorm Imports
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import Workspace from '../../../api/workspace/domain/workspace.entity';
import User from '../../user/domain/user.entity';
import Api from '../../api/domain/api.entity';

@Entity({ name: 'TB_WORKSPACE_COLLECTION' })
export default class Collection extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'collection 이름',
    nullable: true,
  })
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.collection)
  workspace: Relation<Workspace>;

  @ManyToOne(() => User, (user) => user.collection)
  createdUser: Relation<User>;

  @ManyToOne(() => User, (user) => user.collection)
  modifiedUser: Relation<User>;

  @OneToMany(() => Api, (api) => api.collection)
  api: Relation<Api>;
}
