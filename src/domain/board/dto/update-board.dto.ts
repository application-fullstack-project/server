import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInputDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;
}
