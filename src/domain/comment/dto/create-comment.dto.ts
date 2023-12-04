import { Field, InputType, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateCommentInputDto {
  @Field(() => Int)
  postId: number;

  @Field(() => String)
  @MinLength(5, { message: '댓글은 5글자 이상이어야 합니다.' })
  content: string;
}
