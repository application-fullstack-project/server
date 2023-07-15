import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPostByTitleInputDto {
  @Field(() => String)
  title: string;
}
