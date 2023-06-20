import { BaseEntity } from './../base/base.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.comments)
  @Field(() => Post, { nullable: false })
  post: Post;

  @Column({ type: 'int', nullable: false, unique: false })
  postId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User, { nullable: false })
  user: User;

  @Column({ type: 'varchar', length: 255, unique: false })
  @Field(() => String)
  content: string;

  @Column({ type: 'int', nullable: true, unique: false })
  @Field(() => Int, { nullable: true })
  parent_id?: number;
}
