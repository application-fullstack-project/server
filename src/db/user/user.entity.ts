import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { UserRole } from './role';
import { Post } from '../post/post.entity';
import { Like } from '../like/like.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Comment } from '../comment/comment.entity';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: '유저 권한 리스트',
  valuesMap: {
    USER: {
      description: '일반 유저',
    },
    ADMIN: {
      description: '관리자',
    },
  },
});

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  nick_name: string;

  @Column({ type: 'varchar', length: 255, unique: false })
  password: string;

  @Column({ type: 'varchar', length: 1023, unique: false, nullable: true })
  @Field(() => String, { nullable: true })
  push_token?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field(() => UserRole)
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isPush: boolean;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  @Field(() => [Like], { nullable: true })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
