import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ synchronize: false })
@ObjectType()
export class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_date: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_data: Date;

  @DeleteDateColumn({ nullable: true })
  @Field(() => Date)
  deleted_date?: Date;
}
