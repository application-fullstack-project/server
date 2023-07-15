import { AuthGuard } from 'src/guard/gql-guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateCommentInputDto } from './dto';
import { CurrentUser } from 'src/guard/current-user';
import { CommentService } from './comment.service';
import { User } from 'src/db';
import { Comment } from 'src/db';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Comment, { description: '댓글 작성' })
  async createComment(
    @Args('input', { type: () => CreateCommentInputDto })
    input: CreateCommentInputDto,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.createComment(input, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { description: '댓글 삭제' })
  async deleteComment(
    @Args('commentId', { type: () => Int }) commentId: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.commentService.deleteComment(commentId, user);
  }
}
