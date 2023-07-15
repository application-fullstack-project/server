import { Repository } from 'typeorm';
import { CustomRepository } from '../utils/custom-repository';
import { Comment } from './comment.entity';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
