import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInputDto {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Number)
  boardId: number;
}

@InputType()
export class CreatePostOutputDto {
  @Field(() => Boolean)
  isSuccess: boolean;
}
