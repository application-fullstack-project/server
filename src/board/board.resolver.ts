import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { AuthGuard } from 'src/guard/gql-guard';
import { Board } from 'src/db/board/board.entity';
import { CreateBoardInputDto, UpdateBoardInputDto } from './dto';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Board)
  async createBoard(@Args('input') input: CreateBoardInputDto): Promise<Board> {
    return await this.boardService.createBoard(input);
  }

  @UseGuards(AuthGuard)
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
  @Mutation(() => Boolean)
  async deleteBoard(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<Board> {
    return await this.boardService.deleteBoard(id);
  }
}
