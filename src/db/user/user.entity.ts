import { Entity, Column, OneToMany } from 'typeorm';
import { UserRole } from './role';
import { Post } from '../post/post.entity';
import { Like } from '../like/like.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Comment } from '../comment/comment.entity';
import { CustomBaseEntity } from '../base/custom-base.entity';

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
export class User extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  email: string;

  @Column({ name: 'nick_name', type: 'varchar', length: 255, unique: true })
  @Field(() => String)
  nickName: string;

  @Column({ type: 'varchar', length: 255, unique: false })
  password: string;

  @Field(() => String, { nullable: true })
  pushToken?: string;

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
