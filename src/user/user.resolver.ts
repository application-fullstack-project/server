import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/db/user/user.entity';
import { AuthGuard } from 'src/guard/gql-guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return this.userService.hello();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { description: '내 정보 가져오기' })
  async getMe() {
    return await this.userService.getMe();
  }
}
