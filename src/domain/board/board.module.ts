import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { UserService } from 'src/domain/user/user.service';
import { DatabaseModule } from 'src/db';

@Module({
  imports: [DatabaseModule],
  providers: [BoardResolver, BoardService, UserService],
})
export class BoardModule {}
