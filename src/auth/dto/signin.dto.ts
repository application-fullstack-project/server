import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SingInOutputDto {
  @Field(() => String, { description: '토큰' })
  token: string;

  @Field(() => String, { description: '리프레쉬 토큰' })
  refreshToken: string;
}

@InputType()
export class SingInInputDto {
  @Field(() => String, { description: '이메일' })
  email: string;

  @Field(() => String, { description: '비밀번호' })
  password: string;
}
