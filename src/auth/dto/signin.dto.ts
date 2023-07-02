import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@ObjectType()
export class SingInOutputDto {
  @Field(() => String, { description: '토큰' })
  token: string;
}

@InputType()
export class SingInInputDto {
  @Field(() => String, { description: '이메일' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field(() => String, { description: '비밀번호' })
  password: string;
}
