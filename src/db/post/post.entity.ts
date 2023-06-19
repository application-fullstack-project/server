import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';
import { Like } from '../like/like.entity';
import { Comment } from '../comment/comment.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: false })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 255, unique: false })
  @Field(() => String)
  content: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  @Field(() => String, { nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => Board, { nullable: false })
  @ManyToOne(() => Board, (board) => board.posts)
  board: Board;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
