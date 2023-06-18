import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/db/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  hello() {
    return 'Hello World!';
  }

  async getMe(): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: 9,
      },
    });

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}
