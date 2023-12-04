import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@ObjectType()
export class SignUpOutputDto {
  @Field(() => Boolean)
  isSuccess: boolean;
}

@InputType()
export class SignUpInputDto {
  @Field(() => String)
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field(() => String)
  nickName: string;

  @Field(() => String)
  password: string;
}
