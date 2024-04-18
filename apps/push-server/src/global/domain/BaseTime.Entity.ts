// ** Typeorm Imports
import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date' })
  modifiedDate: Date;
}
