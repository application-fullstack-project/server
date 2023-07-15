import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Post } from '../post/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Board extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 255, unique: false, default: '' })
  @Field(() => String)
  description: string;

  @OneToMany(() => Post, (post) => post.board)
  posts: Post[];
}
