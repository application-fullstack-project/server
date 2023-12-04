import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthGuard, CurrentUser } from 'src/guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/db';
import { Comment } from 'src/db';

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
  @Mutation(() => User, { description: '유저 정보 변경하기' })
  async updateMe(
    @Args('nickName', { type: () => String }) nickName: string,
    @Args('isPush', { type: () => Boolean }) isPush: boolean,
    @CurrentUser() user: User,
  ) {
    return await this.userService.updateMe(user.id, nickName, isPush);
  }
}
