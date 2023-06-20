import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Like } from 'src/db/like/like.entity';
import { PostService } from 'src/post/post.service';
import { Comment } from 'src/db/comment/comment.entity';

export interface LikeByPostIdLoader {
  loader: DataLoader<number, Like[]>;
}

export interface CommentsByPostIdLoader {
  loader: DataLoader<number, Comment[]>;
}

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
