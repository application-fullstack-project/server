import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardInputDto, UpdateBoardInputDto } from './dto';
import { GraphQLError } from 'graphql';
import { Board } from 'src/db';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async createBoard({ title }: CreateBoardInputDto) {
    const board = await this.boardRepository.save(
      this.boardRepository.create({
        title,
      }),
    );
    return board;
  }

  async updateBoard({ id, title }: UpdateBoardInputDto) {
    await this.boardRepository.update(id, {
      title,
    });

    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });

    if (!board) {
      throw new GraphQLError('게시판을 찾을 수 없습니다.');
    }

    return board;
  }

  async getAllBoard() {
    const boards = await this.boardRepository.find();
    return boards;
  }

  async deleteBoard(id: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });

    if (!board) {
      throw new GraphQLError('게시판을 찾을 수 없습니다.');
    }

    // TODO: 연관된 게시글, 좋아요 처리 필요

    await this.boardRepository.delete({
      id,
    });

    return board;
  }
}
