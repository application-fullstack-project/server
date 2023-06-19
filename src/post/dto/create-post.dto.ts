import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInputDto {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int)
  boardId: number;
}

@InputType()
export class CreatePostOutputDto {
  @Field(() => Boolean)
  isSuccess: boolean;
}
