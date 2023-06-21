import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';
import {
  SingInInputDto,
  SingInOutputDto,
  SingUpInputDto,
  SingUpOutputDto,
} from './dto';
import { User } from 'src/db';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup({
    email,
    password,
    nickName,
  }: SingUpInputDto): Promise<SingUpOutputDto> {
    // 이메일 확인
    const existEmail = (await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['email'],
    })) as { email: string };

    if (existEmail) {
      throw new GraphQLError('이미 존재하는 이메일입니다.');
    }

    // 닉네임 확인
    const existNickName = (await this.userRepository.findOne({
      where: {
        nick_name: nickName,
      },
      select: ['nick_name'],
    })) as { nick_name: string };

    if (existNickName) {
      throw new GraphQLError('이미 존재하는 닉네임입니다.');
    }

    // db에 유저 저장
    const user = this.userRepository.create({
      email,
      password,
      nick_name: nickName,
    });
    await this.userRepository.save(user);

    return { isSuccess: true };
  }

  async signin({ email, password }: SingInInputDto): Promise<SingInOutputDto> {
    // 이메일, 비밀번호 확인
    const user = await this.userRepository.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new GraphQLError('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    // 토큰 생성
    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
