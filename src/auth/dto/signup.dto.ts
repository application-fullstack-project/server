import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SingUpOutputDto {
  @Field(() => Boolean)
  isSuccess: boolean;
}

@InputType()
export class SingUpInputDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  nickName: string;

  @Field(() => String)
  password: string;
}
