import { Post } from './../db/post/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CreatePostInputDto,
  LikePostInputDto,
  UpdatePostInputDto,
} from './dto';
import { GraphQLError } from 'graphql';
import { User } from 'src/db/user/user.entity';
import { Like } from 'src/db/like/like.entity';
import { CreateCommentInputDto } from './dto/comment.dto';
import { Comment } from 'src/db/comment/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createPost(
    { title, content, image, boardId }: CreatePostInputDto,
    { id: userId }: User,
  ) {
    const post = await this.postRepository.save(
      this.postRepository.create({
        title,
        content,
        image,
        board: {
          id: boardId,
        },
        user: {
          id: userId,
        },
      }),
    );
    return post;
  }

  async getOnePost(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['board', 'likes', 'comments'],
    });

    console.log(post);

    if (!post) {
      throw new GraphQLError('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  async updatePost({ id, title, content, image }: UpdatePostInputDto) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new GraphQLError('게시글을 찾을 수 없습니다.');
    }

    const updatedPost = await this.postRepository.save({
      id,
      title,
      content,
      image,
    });

    return updatedPost;
  }

  async deletePost(id: number) {
    await this.postRepository.delete({
      id,
    });

    return true;
  }

  async likePost({ postId, like }: LikePostInputDto, { id: userId }: User) {
    if (like) {
      // 좋아요 관계가 있다면, false를 반환한다.
      const existLike = await this.likeRepository.findOne({
        where: {
          post: { id: postId },
          user: { id: userId },
        },
      });
      if (existLike) {
        console.log('좋아요가 눌러진 상태입니다.');
        return false;
      }
      await this.likeRepository.save(
        this.likeRepository.create({
          post: { id: postId },
          user: { id: userId },
        }),
      );
    } else {
      await this.likeRepository.delete({
        post: { id: postId },
        user: { id: userId },
      });
    }
    return true;
  }

  async createComment(
    { content, parentId, postId }: CreateCommentInputDto,
    { id: userId }: User,
  ) {
    const comment = await this.commentRepository.save(
      this.commentRepository.create({
        content,
        parent_id: parentId,
        post: {
          id: postId,
        },
        user: {
          id: userId,
        },
      }),
    );
    return comment;
  }

  async deleteComment(commentId: number, { id: userId }: User) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
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
