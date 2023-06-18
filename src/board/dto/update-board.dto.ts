import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInputDto {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  title: string;
}
