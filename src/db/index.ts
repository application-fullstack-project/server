import { Board } from './board/board.entity';
import { Comment } from './comment/comment.entity';
import { Like } from './like/like.entity';
import { Post } from './post/post.entity';
import { User } from './user/user.entity';
export { Board, Comment, Like, Post, User };

import { UserRepository } from './user/user.repository';
import { BoardRepository } from './board/board.repository';
import { CommentRepository } from './comment/comment.repository';
import { LikeRepository } from './like/like.repository';
import { PostRepository } from './post/post.repository';
export {
  UserRepository,
  BoardRepository,
  CommentRepository,
  LikeRepository,
  PostRepository,
};

import { DatabaseModule } from './database.module';
export { DatabaseModule };
