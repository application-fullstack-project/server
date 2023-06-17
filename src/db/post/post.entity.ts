import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: false })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: false })
  content: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  image?: string;
}
