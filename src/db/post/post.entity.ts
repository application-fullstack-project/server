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

  @ManyToOne(() => Board, (board) => board.posts)
  @Field(() => Board, { nullable: false })
  board: Board;

  @OneToMany(() => Like, (like) => like.post)
  @Field(() => [Like], { nullable: true })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
