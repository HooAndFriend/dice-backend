// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

// ** enum, dto, entity Imports
import { BaseTimeEntity } from '@hi-dice/common';
import Ticket from './ticket.entity';

@Entity({ name: 'TB_TICKET_FILE' })
export default class TicketFile extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  ticketFileId: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'url',
    comment: 'url',
    nullable: false,
  })
  url: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketFile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  ticket: Relation<Ticket>;
}
