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

  async getMe(user: User): Promise<User> {
    // console.log(user);
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

    user.nick_name = nickname;
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
