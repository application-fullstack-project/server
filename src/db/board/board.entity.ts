import { Entity, Column, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '../base/custom-base.entity';
import { Post } from '../post/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Board extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, unique: false })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 255, unique: false, default: '' })
  @Field(() => String)
  description: string;

  @OneToMany(() => Post, (post) => post.board)
  posts: Post[];
}
