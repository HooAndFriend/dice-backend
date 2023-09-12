// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';

@Entity({ name: 'TB_WORKSPACE' })
@Unique(['name'])
export default class Workspace extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '워크스페이스 이름',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    comment: '워크스페이스 설명',
    nullable: false,
  })
  comment: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '워크스페이스 프로필 이미지',
    nullable: true,
  })
  profile: string;
}
