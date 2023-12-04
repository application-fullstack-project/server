import { FindPostByTitleInputDto } from './dto/find-post.dto';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, AuthGuard } from 'src/guard';
import { CommentsByPostIdLoader, LikeByPostIdLoader } from 'src/loader/types';
import {
  CreatePostInputDto,
  LikePostInputDto,
  UpdatePostInputDto,
} from './dto';
import { Like, Post, Comment, User } from 'src/db';
import { Roles } from 'src/guard/role-decorator';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Post, { description: '게시글 작성' })
  async createPost(
    @Args('input', { type: () => CreatePostInputDto })
    input: CreatePostInputDto,
    @CurrentUser() user: User,
  ): Promise<Post> {
    return await this.postService.createPost(input, user);
  }

  @Query(() => Post, { description: '한개의 게시글 조회' })
  async getOnePost(
    @Args('id', { type: () => Int }) postId: number,
  ): Promise<Post> {
    return await this.postService.getOnePost(postId);
  }

  @Query(() => [Post], { description: '게시판의 모든 게시물 조회' })
  async getBoardPosts(
    @Args('id', { type: () => Int }) boardId: number,
  ): Promise<Post[]> {
    return await this.postService.getBoardPosts(boardId);
  }

  @Query(() => [Post], { description: '인기 게시물 조회' })
  async getPopularPosts(): Promise<Post[]> {
    return await this.postService.getPopularPosts();
  }

  @ResolveField('likes', () => [Like])
  async getLikesByPostId(
    @Parent() { id: postId }: Post,
    @Context('likeByPostLoader') { loader }: LikeByPostIdLoader,
  ) {
    return await loader.load(postId);
  }

  @ResolveField('comments', () => [Comment])
  async getCommentsByPostId(
    @Parent() { id: postId }: Post,
    @Context('commentByPostLoader') { loader }: CommentsByPostIdLoader,
  ) {
    return await loader.load(postId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post, { description: '게시글 수정' })
  async updatePost(
    @Args('input', { type: () => UpdatePostInputDto })
    input: UpdatePostInputDto,
  ): Promise<Post> {
    return await this.postService.updatePost(input);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { description: '게시글 삭제' })
  async deletePost(
    @Args('postId', { type: () => Int }) postId: number,
    @CurrentUser() { id: userId }: User,
  ): Promise<boolean> {
    return await this.postService.deletePost(postId, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { description: '관리자용 게시글 삭제' })
  @Roles('ADMIN')
  async deletePostAdmin(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<boolean> {
    return await this.postService.deletePost(postId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { description: '게시글 좋아요 클릭' })
  async likePost(
    @Args('input', { type: () => LikePostInputDto }) input: LikePostInputDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.postService.likePost(input, user);
  }

  @UseGuards(AuthGuard)
  @Query(() => Post, { description: '게시글 제목으로 조회' })
  async findPostByTitle(
    @Args('input', { type: () => FindPostByTitleInputDto })
    input: FindPostByTitleInputDto,
  ): Promise<Post> {
    return await this.postService.findPostByTitle(input);
  }
}
