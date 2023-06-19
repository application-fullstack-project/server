import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LikePostInputDto {
  @Field(() => Int)
  postId: number;

  @Field(() => Boolean)
  like: boolean;
}
