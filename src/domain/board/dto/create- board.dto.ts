import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInputDto {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
