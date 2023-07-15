import { Repository } from 'typeorm';
import { CustomRepository } from '../utils/custom-repository';
import { Like } from './like.entity';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {}
