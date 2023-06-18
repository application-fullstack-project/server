import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from 'src/db/board/board.entity';
import { User } from 'src/db/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board])],
  providers: [BoardResolver, BoardService, UserService],
})
export class BoardModule {}
