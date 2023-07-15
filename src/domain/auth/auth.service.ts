import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';
import {
  SingInInputDto,
  SingInOutputDto,
  SingUpInputDto,
  SingUpOutputDto,
} from './dto';
import { UserRepository } from 'src/db';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpInputDto: SingUpInputDto): Promise<SingUpOutputDto> {
    const { email, nickName } = signUpInputDto;

    // 이메일 확인
    if (!this.userRepository.isEmailExist(email)) {
      throw new GraphQLError('이미 존재하는 이메일입니다.');
    }

    // 닉네임 확인
    if (!this.userRepository.isNickNameExist(nickName)) {
      throw new GraphQLError('이미 존재하는 닉네임입니다.');
    }

    // db에 유저 저장
    const user = this.userRepository.create({ ...signUpInputDto });
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
