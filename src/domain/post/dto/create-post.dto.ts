import { Field, InputType, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreatePostInputDto {
  @Field(() => String)
  @MinLength(5, { message: '제목은 5자 이상 입력해주세요.' })
  title: string;

  @Field(() => String)
  @MinLength(10, { message: '내용은 10자 이상 입력해주세요.' })
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
