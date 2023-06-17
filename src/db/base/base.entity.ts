import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity({ synchronize: false })
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_data: Date;

  @DeleteDateColumn()
  deleted_date: Date;
}
