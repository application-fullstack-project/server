import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Board extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: false })
  title: string;
}
