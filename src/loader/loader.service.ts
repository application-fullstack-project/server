import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PostService } from 'src/domain/post/post.service';
import { CommentsByPostIdLoader, LikeByPostIdLoader } from './types';
import { Like, Comment } from 'src/db';

@Injectable()
export class LoaderService {
  constructor(private readonly postService: PostService) {}

  getLikesByPostId(): LikeByPostIdLoader {
    const loader = new DataLoader<number, Like[]>(async (postIds) => {
      const likes = await this.postService.getLikesByPostId(
        postIds as number[],
      );
      const result = postIds.map((postId) =>
        likes.filter((like) => like.postId === postId),
      );
      return result;
    });
    return { loader };
  }

  getCommentsByPostId(): CommentsByPostIdLoader {
    const loader = new DataLoader<number, Comment[]>(async (postIds) => {
      const comments = await this.postService.getCommentsByPostId(
        postIds as number[],
      );
      const result = postIds.map((postId) =>
        comments.filter((comment) => comment.postId === postId),
      );
      return result;
    });
    return { loader };
  }
}
