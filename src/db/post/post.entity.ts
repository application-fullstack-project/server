import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';
import { Like } from '../like/like.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: false })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: false })
  content: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Board, (board) => board.posts)
  board: Board;

  @ManyToOne(() => Like, (like) => like.users)
  like: Like;
}
