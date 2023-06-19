import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { AuthGuard } from 'src/guard/gql-guard';
import { Board } from 'src/db/board/board.entity';
import { CreateBoardInputDto, UpdateBoardInputDto } from './dto';
import { Roles } from 'src/guard/role-decorator';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Mutation(() => Board)
  async createBoard(@Args('input') input: CreateBoardInputDto): Promise<Board> {
    return await this.boardService.createBoard(input);
  }

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Mutation(() => Board)
  async updateBoard(@Args('input') input: UpdateBoardInputDto): Promise<Board> {
    return await this.boardService.updateBoard(input);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Board])
  async getAllBoard(): Promise<Board[]> {
    return await this.boardService.getAllBoard();
  }

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Mutation(() => Boolean)
  async deleteBoard(
    @Args('boardId', { type: () => Int }) boardId: number,
  ): Promise<Board> {
    return await this.boardService.deleteBoard(boardId);
  }
}
