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
import { AuthGuard } from 'src/guard/gql-guard';
import { CurrentUser } from 'src/guard/current-user';
import { CommentsByPostIdLoader, LikeByPostIdLoader } from 'src/loader/types';
import {
  CreateCommentInputDto,
  CreatePostInputDto,
  LikePostInputDto,
  UpdatePostInputDto,
} from './dto';
import { Like, Post, Comment, User } from 'src/db';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Args('input', { type: () => CreatePostInputDto })
    input: CreatePostInputDto,
    @CurrentUser() user: User,
  ): Promise<Post> {
    return await this.postService.createPost(input, user);
  }

  @UseGuards(AuthGuard)
  @Query(() => Post)
  async getOnePost(
    @Args('id', { type: () => Int }) postId: number,
  ): Promise<Post> {
    return await this.postService.getOnePost(postId);
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
  @Mutation(() => Post)
  async updatePost(
    @Args('input', { type: () => UpdatePostInputDto })
    input: UpdatePostInputDto,
  ): Promise<Post> {
    return await this.postService.updatePost(input);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deletePost(
    @Args('postId', { type: () => Int }) postId: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.postService.deletePost(postId, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @Args('input', { type: () => CreateCommentInputDto })
    input: CreateCommentInputDto,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.postService.createComment(input, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteComment(
    @Args('commentId', { type: () => Int }) commentId: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.postService.deleteComment(commentId, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Args('input', { type: () => LikePostInputDto }) input: LikePostInputDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.postService.likePost(input, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  async findPostByTitle(
    @Args('input', { type: () => FindPostByTitleInputDto })
    input: FindPostByTitleInputDto,
  ): Promise<Post> {
    return await this.postService.findPostByTitle(input);
  }
}
