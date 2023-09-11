// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import { UserType } from 'src/enums/UserType.enum';

@Entity({ name: 'tbl_user' })
@Unique(['email'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '소셜 토큰',
    nullable: false,
  })
  token: string;

  @Column({
    type: 'enum',
    enum: UserType,
    comment: '소셜 종류',
    nullable: false,
  })
  type: UserType;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '닉네임',
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '닉네임',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '프로필 이미지',
    nullable: true,
  })
  profile: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '링크',
    nullable: true,
  })
  link: string;
}
