import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../utils/custom-repository';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async isEmailExist(email: string): Promise<boolean> {
    const data = await this.findOne({
      where: {
        email,
      },
      select: ['email'],
    });

    if (data) {
      return true;
    }

    return false;
  }

  async isNickNameExist(nickName: string): Promise<boolean> {
    const data = await this.findOne({
      where: {
        nickName,
      },
      select: ['nickName'],
    });

    if (data) {
      return true;
    }

    return false;
  }
}
