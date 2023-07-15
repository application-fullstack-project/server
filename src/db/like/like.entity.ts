import { Entity, ManyToOne, Column } from 'typeorm';
import { CustomBaseEntity } from '../base/custom.base.entity';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Like extends CustomBaseEntity {
  @ManyToOne(() => Post, (post) => post.likes)
  @Field(() => Post, { nullable: false })
  post: Post;

  @Column({ type: 'int', nullable: false })
  postId: number;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(() => User, { nullable: false })
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isLike: boolean;
}
