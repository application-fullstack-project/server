import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // context는 object 객체라서 call by value로 동작한다.

    // 토큰 유효성 검증하기
    const ctx = GqlExecutionContext.create(context);
    this.validateToken(ctx);
    // context에 유저 정보 입력하기
    await this.applyUserToContext(ctx);
    // role 검증하기
    return this.validateRole(context);
  }

  private validateToken(ctx: GqlExecutionContext) {
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
    return rawToken;
  }

  private async applyUserToContext(ctx: GqlExecutionContext) {
    const rawToken =
      ctx.getContext().req.headers?.authorization?.split(' ')[1] || '';
    const userId = this.jwtService.decode(rawToken)['id'];
    const user = await this.userService.getUserById(userId);
    ctx.getContext().user = user;
  }

  private validateRole(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const userRole = GqlExecutionContext.create(context).getContext().user.role;

    // role이 없으면 모든 권한의 유저들 통과
    if (!roles) {
      return true;
    }
    // role이 있으면 role 검증
    if (!roles.includes(userRole)) {
      throw new GraphQLError('권한이 없습니다.');
    }
    // 올바른 권한
    return true;
  }
}
