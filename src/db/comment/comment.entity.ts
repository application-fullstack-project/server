import { CustomBaseEntity } from '../base/custom-base.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
@Entity()
@ObjectType()
export class Comment extends CustomBaseEntity {
  @ManyToOne(() => Post, (post) => post.comments)
  @Field(() => Post, { nullable: false })
  post: Post;

  @Column({ type: 'int', nullable: false })
  postId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User, { nullable: false })
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', length: 255, unique: false })
  @Field(() => String)
  content: string;

  @Column({ name: 'parent_id', type: 'int', nullable: true, unique: false })
  @Field(() => Int, { nullable: true })
  parentId?: number;
}
