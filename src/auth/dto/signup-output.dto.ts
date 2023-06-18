import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SingUpOutputDto {
  @Field(() => Boolean)
  isSuccess: boolean;
}
