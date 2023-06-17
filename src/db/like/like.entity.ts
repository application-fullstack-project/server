import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Like extends BaseEntity {
  @OneToMany(() => User, (user) => user.like)
  users: User[];

  @OneToMany(() => Post, (post) => post.like)
  posts: Post[];
}
