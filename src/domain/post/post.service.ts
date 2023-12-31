import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import {
  CreatePostInputDto,
  FindPostByTitleInputDto,
  LikePostInputDto,
  UpdatePostInputDto,
} from './dto';
import { GraphQLError } from 'graphql';
import {
  User,
  PostRepository,
  LikeRepository,
  CommentRepository,
} from 'src/db';

@Injectable()
export class PostService {
  constructor(
  private readonly postRepository: PostRepository,
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async createPost(createPostInput: CreatePostInputDto, { id: userId }: User) {
    const post = await this.postRepository.create({
      ...createPostInput,
      userId,
    });
    await this.postRepository.save(post);
    return post;
  }

  async getOnePost(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['board', 'user'],
    });

    if (!post) {
      throw new GraphQLError('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  async getBoardPosts(boardId: number) {
    const posts = await this.postRepository.find({
      where: {
        boardId,
      },
      order: {
        created_date: 'DESC',
      },
      relations: ['board'],
    });

    return posts;
  }

  /**
   * dataLoader로 불러올때 사용
   * @param postIds
   * @returns
   */
  async getLikesByPostId(postIds: readonly number[]) {
    const likes = await this.likeRepository.find({
      where: {
        postId: In(postIds),
      },
    });
    return likes;
  }

  /**
   * dataLoader로 불러올때 사용
   * @param postIds
   * @returns
   */
  async getCommentsByPostId(postIds: readonly number[]) {
    const comments = await this.commentRepository.find({
      where: {
        postId: In(postIds),
      },
      relations: ['user'],
    });
    return comments;
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

    post.title = title ? title : post.title;
    post.content = content ? content : post.content;
    post.image = image ? image : post.image;

    await this.postRepository.save(post);

    return post;
  }

  /**
   * userId가 있다면 해당 유저가 작성한 게시글만 삭제 가능, 없다면 모든 유저가 삭제 가능
   * @param postId
   * @param userId
   * @returns
   */
  async deletePost(postId: number, userId?: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['user'],
    });

    if (!post) {
      throw new GraphQLError('게시글을 찾을 수 없습니다.');
    }

    if (userId && post.user.id !== userId) {
      throw new GraphQLError('게시글을 삭제할 권한이 없습니다.');
    }

    // 좋아요, 댓글, 게시글 삭제
    await this.likeRepository.delete({
      postId,
    });
    await this.commentRepository.delete({
      postId,
    });
    await this.postRepository.delete({
      id: postId,
    });

    return true;
  }

  async likePost({ postId, like }: LikePostInputDto, { id: userId }: User) {
    if (like) {
      // 좋아요 관계가 있다면, false를 반환한다.
      const existLike = await this.likeRepository.findOne({
        where: {
          postId,
          userId,
        },
      });
      if (existLike) {
        console.log('좋아요가 눌러진 상태입니다.');
        return false;
      }
      await this.likeRepository.save(
        this.likeRepository.create({
          postId,
          userId,
        }),
      );
    } else {
      await this.likeRepository.delete({
        postId,
        userId,
      });
    }
    return true;
  }

  async findPostByTitle({ title }: FindPostByTitleInputDto) {
    const post = await this.postRepository.findOne({
      where: {
        title,
      },
    });

    return post;
  }

  async getPopularPosts() {
    // 24시간 이내 좋아요가 5개 이상인 게시물 조회
    const posts = await this.postRepository.getPopularPosts();
    return posts;
  }
}
