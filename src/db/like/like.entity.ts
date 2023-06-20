import { Entity, ManyToOne, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Like extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.likes)
  @Field(() => Post, { nullable: false })
  post: Post;

  @Column({ type: 'int' })
  postId: number;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(() => User, { nullable: false })
  user: User;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isLike: boolean;
}
