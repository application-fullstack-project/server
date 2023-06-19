import { BaseEntity } from './../base/base.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: false })
  @Field(() => String)
  content: string;

  @Column({ type: 'int', unique: false })
  @Field(() => Int)
  parent_id: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
