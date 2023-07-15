import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  SingInInputDto,
  SingInOutputDto,
  SingUpInputDto,
  SingUpOutputDto,
} from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SingUpOutputDto, { description: '회원가입' })
  async signup(
    @Args({ name: 'input', type: () => SingUpInputDto })
    input: SingUpInputDto,
  ) {
    return await this.authService.signup(input);
  }

  @Mutation(() => SingInOutputDto, { description: '로그인' })
  async signin(
    @Args({ name: 'input', type: () => SingInInputDto })
    input: SingInInputDto,
  ) {
    return await this.authService.signin(input);
  }
}
