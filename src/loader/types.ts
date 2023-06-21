import * as DataLoader from 'dataloader';
import { Like } from 'src/db/like/like.entity';
import { Comment } from 'src/db/comment/comment.entity';

interface LikeByPostIdLoader {
  loader: DataLoader<number, Like[]>;
}

interface CommentsByPostIdLoader {
  loader: DataLoader<number, Comment[]>;
}

export { LikeByPostIdLoader, CommentsByPostIdLoader };
