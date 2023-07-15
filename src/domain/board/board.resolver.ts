import { Roles } from './../../guard/role-decorator';
import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from 'src/db/board/board.entity';
import { CreateBoardInputDto, UpdateBoardInputDto } from './dto';
import { AuthGuard } from 'src/guard';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Mutation(() => Board, { description: '게시판 생성' })
  async createBoard(@Args('input') input: CreateBoardInputDto): Promise<Board> {
    return await this.boardService.createBoard(input);
  }

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Mutation(() => Board, { description: '게시판 이름 수정' })
  async updateBoard(@Args('input') input: UpdateBoardInputDto): Promise<Board> {
    return await this.boardService.updateBoard(input);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Board], { description: '게시판 리스트 조회' })
  async getAllBoard(): Promise<Board[]> {
    return await this.boardService.getAllBoard();
  }

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Mutation(() => Boolean, { description: '게시판 삭제' })
  async deleteBoard(
    @Args('boardId', { type: () => Int }) boardId: number,
  ): Promise<Board> {
    return await this.boardService.deleteBoard(boardId);
  }
}
