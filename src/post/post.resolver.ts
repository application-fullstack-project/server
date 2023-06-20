import { LikePostInputDto } from './dto/like-post.dto';
import { CreatePostInputDto } from './dto/create-post.dto';
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
import { Post } from 'src/db/post/post.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/gql-guard';
import { UpdatePostInputDto } from './dto';
import { CurrentUser } from 'src/guard/current-user';
import { User } from 'src/db/user/user.entity';
import { CreateCommentInputDto } from './dto/comment.dto';
import { Comment } from 'src/db/comment/comment.entity';
import { Like } from 'src/db/like/like.entity';
import {
  CommentsByPostIdLoader,
  LikeByPostIdLoader,
  LoaderService,
} from 'src/loader/loader.service';
import { Board } from 'src/db/board/board.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly loaderService: LoaderService,
  ) {}

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
  ): Promise<boolean> {
    return await this.postService.deletePost(postId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
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
}
