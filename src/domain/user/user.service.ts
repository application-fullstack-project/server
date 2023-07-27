import { Injectable } from '@nestjs/common';
import { User, UserRepository } from 'src/db';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  hello() {
    return 'Hello World!';
  }

  async getMe(user: User): Promise<User> {
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

  async changeNickname(nickname: string, { id: userId }: User) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    user.nickName = nickname;
    await this.userRepository.save(user);

    return user;
  }

  async changePushSetting(isPush: boolean, { id: userId }: User) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    user.isPush = isPush;
    await this.userRepository.save(user);

    return user;
  }
}
