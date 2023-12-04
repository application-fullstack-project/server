import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  SignInInputDto,
  SignInOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpOutputDto, { description: '회원가입' })
  async signup(
    @Args({ name: 'input', type: () => SignUpInputDto })
    input: SignUpInputDto,
  ) {
    return await this.authService.signup(input);
  }

  @Mutation(() => SignInOutputDto, { description: '로그인' })
  async signin(
    @Args({ name: 'input', type: () => SignInInputDto })
    input: SignInInputDto,
  ) {
    return await this.authService.signin(input);
  }
}
