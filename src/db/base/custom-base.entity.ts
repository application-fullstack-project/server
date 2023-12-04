import { Field, ID, ObjectType } from '@nestjs/graphql';
import { number } from 'joi';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ synchronize: false })
@ObjectType()
export class CustomBaseEntity extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_date: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_data: Date;

  @DeleteDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  deleted_date?: Date;
}
