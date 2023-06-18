import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SingInOutputDto {
  @Field(() => String, { description: '토큰' })
  token: string;

  @Field(() => String, { description: '리프레쉬 토큰' })
  refreshToken: string;
}
