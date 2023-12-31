import { Injectable } from '@nestjs/common';
import { CreateCommentInputDto } from './dto';
import { CommentRepository, User } from 'src/db';
import { GraphQLError } from 'graphql';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    createCommentInputDto: CreateCommentInputDto,
    { id: userId }: User,
  ) {
    const comment = this.commentRepository.create({
      ...createCommentInputDto,
      userId,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async deleteComment(commentId: number, { id: userId }: User) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
      relations: ['user'],
    });

    if (!comment) {
      throw new GraphQLError('댓글을 찾을 수 없습니다.');
    }

    if (comment.user.id !== userId) {
      throw new GraphQLError('댓글을 삭제할 권한이 없습니다.');
    }

    await this.commentRepository.delete({
      id: commentId,
    });

    return true;
  }
}
