import { Repository } from 'typeorm';
import { CustomRepository } from '../utils/custom-repository';
import { Board } from './board.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
