// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../common/entity/BaseTime.Entity';
import User from '../../user/domain/user.entity';
import { ColumnType, IsNull } from '../../../common/enum/ColumnType.enum';
import Table from './erd.table.entity';

@Entity({ name: 'TB_COLUMN' })
export default class Columns extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.table)
  create_user: Relation<User>;

  @ManyToOne(() => User, (user) => user.table)
  modify_user: Relation<User>;

  @ManyToOne(() => Table, (table) => table.column)
  table: Relation<Table>;

  @Column({
    type: 'enum',
    enum: ColumnType,
    name: 'key',
    comment: 'PK FK 여부',
    nullable: true,
  })
  key: ColumnType;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '컬럼 명',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: IsNull,
    name: 'isnull',
    comment: 'null 허용',
    nullable: false,
  })
  isnull: IsNull;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'dataType',
    comment: '데이터 타입',
    nullable: true,
  })
  data_type: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'option',
    comment: '옵션',
    nullable: true,
  })
  option: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'comment',
    comment: '코멘트',
    nullable: true,
  })
  comment: string;
}