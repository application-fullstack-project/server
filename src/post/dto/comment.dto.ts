import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInputDto {
  @Field(() => Int)
  postId: number;

  @Field(() => String)
  content: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;
}
