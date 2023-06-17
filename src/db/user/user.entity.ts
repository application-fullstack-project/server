import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { UserRole } from './role';
import { Post } from '../post/post.entity';
import { Like } from '../like/like.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nick_name: string;

  @Column({ type: 'varchar', length: 1023, unique: false })
  refresh_token: string;

  @Column({ type: 'varchar', length: 1023, unique: false, nullable: true })
  push_token?: string;

  @Column({ type: 'varchar', length: 255, unique: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToOne(() => Like, (like) => like.users)
  like: Like;
}
