// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import Ticket from './ticket.entity';
import Workspace from '../../workspace/domain/workspace.entity';

@Entity({ name: 'TB_SPRINT' })
export default class Sprint extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    comment: '스프린트 이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'date',
    name: 'start_date',
    comment: '시작일',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'date',
    name: 'end_date',
    comment: '마감일',
    nullable: false,
  })
  endDate: Date;

  @Column({
    type: 'int',
    comment: '정렬 순서',
    nullable: false,
  })
  orderId: number;

  @OneToMany(() => Ticket, (ticket) => ticket.sprint, { nullable: true })
  ticket: Relation<Ticket>[];

  @ManyToOne(() => Workspace, (workspace) => workspace.sprint, {
    onDelete: 'CASCADE',
  })
  workspace: Relation<Workspace>;
}