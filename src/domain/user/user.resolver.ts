import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthGuard, CurrentUser } from 'src/guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/db';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return this.userService.hello();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { description: '내 정보 가져오기' })
  async getMe(@CurrentUser() user: User) {
    return await this.userService.getMe(user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { description: '유저 닉네임 변경하기' })
  async changeNickname(
    @Args('nickname', { type: () => String }) nickname: string,
    @CurrentUser() user: User,
  ) {
    return await this.userService.changeNickname(nickname, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { description: '유저 닉네임 변경하기' })
  async changePushSetting(
    @Args('isPush', { type: () => Boolean }) isPush: boolean,
    @CurrentUser() user: User,
  ) {
    return await this.userService.changePushSetting(isPush, user);
  }
}
