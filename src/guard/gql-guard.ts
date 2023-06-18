import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 토큰 유효성 검증하기
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers?.authorization;
    if (!token) {
      throw new GraphQLError('토큰이 잘못되었습니다');
    }
    const rawToken = token.split(' ')[1];
    try {
      this.jwtService.verify(rawToken);
    } catch (e) {
      console.log(e);
      throw new GraphQLError('토큰 검증에 실패했습니다.');
    }
    // context에 유저 정보 입력하기
    const id = this.jwtService.decode(rawToken)['id'];
    const user = await this.userService.getUserById(id);
    delete user.password;
    ctx.getContext().user = user;
    return true;
  }
}
