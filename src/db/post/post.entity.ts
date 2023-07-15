import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CustomBaseEntity } from '../base/custom.base.entity';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';
import { Like } from '../like/like.entity';
import { Comment } from '../comment/comment.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Post extends CustomBaseEntity {
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
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => Board, (board) => board.posts)
  @Field(() => Board, { nullable: false })
  board: Board;

  @Column({ type: 'int', nullable: false })
  boardId: number;

  @OneToMany(() => Like, (like) => like.post)
  @Field(() => [Like], { nullable: true })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
