import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInputDto {
  @Field(() => Number)
  postId: number;

  @Field(() => String)
  content: string;

  @Field(() => Number, { nullable: true })
  parentId?: number;
}
