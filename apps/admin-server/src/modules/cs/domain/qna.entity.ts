// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/domain/BaseTime.Entity';
import CsCategoryEnum from './cs-category.enum';

@Entity({ name: 'TB_QNA' })
export default class Qna extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '질문',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    comment: '답변',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: CsCategoryEnum,
    comment: '카테고리',
    nullable: false,
  })
  category: CsCategoryEnum;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '제목',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    comment: '내용',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '답변자 ID',
    nullable: false,
  })
  answerId: string;

  @Column({
    type: 'boolean',
    comment: '답변 여부',
    name: 'is_answer',
    nullable: false,
  })
  isAnswer: boolean;
}