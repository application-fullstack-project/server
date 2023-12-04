import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@ObjectType()
export class SignInOutputDto {
  @Field(() => String, { description: '토큰' })
  token: string;

  @Field(() => Number, { description: '고유ID' })
  id: number;
}

@InputType()
export class SignInInputDto {
  @Field(() => String, { description: '이메일' })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @Field(() => String, { description: '비밀번호' })
  @Transform(({ value }) => value.trim())
  password: string;
}
