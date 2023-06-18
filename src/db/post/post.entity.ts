import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';
import { Like } from '../like/like.entity';
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
  board: Board;

  @ManyToOne(() => Like, (like) => like.users)
  like: Like;
}
