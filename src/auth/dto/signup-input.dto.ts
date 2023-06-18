import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SingUpInputDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  nickName: string;

  @Field(() => String)
  password: string;
}
