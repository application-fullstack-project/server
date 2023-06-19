import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Like extends BaseEntity {
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'postId' })
  post: Post;
}
