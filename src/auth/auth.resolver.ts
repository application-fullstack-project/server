import { TransformEmailPipe } from './../pipe/email.pipe';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  SingInInputDto,
  SingInOutputDto,
  SingUpInputDto,
  SingUpOutputDto,
} from './dto';
import { UsePipes } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SingUpOutputDto, { description: '회원가입' })
  @UsePipes(new TransformEmailPipe())
  async signup(
    @Args({ name: 'input', type: () => SingUpInputDto })
    input: SingUpInputDto,
  ) {
    return await this.authService.signup(input);
  }

  @Mutation(() => SingInOutputDto, { description: '로그인' })
  @UsePipes(new TransformEmailPipe())
  async signin(
    @Args({ name: 'input', type: () => SingInInputDto })
    input: SingUpInputDto,
  ) {
    return await this.authService.signin(input);
  }
}
