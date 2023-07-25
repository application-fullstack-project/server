import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { DatabaseModule } from 'src/db';

@Module({
  imports: [DatabaseModule],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
