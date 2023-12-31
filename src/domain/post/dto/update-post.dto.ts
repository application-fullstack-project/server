import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInputDto {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  image?: string;
}

@ObjectType()
export class UpdatePostOutputDto {
  @Field(() => Boolean)
  isSuccess: boolean;
}
