import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LikePostInputDto {
  @Field(() => Number)
  postId: number;

  @Field(() => Boolean)
  like: boolean;
}
