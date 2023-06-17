import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Board extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: false })
  title: string;

  @OneToMany(() => Post, (post) => post.board)
  posts: Post[];
}
