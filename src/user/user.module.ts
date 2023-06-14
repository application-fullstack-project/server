import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, UserResolver],
})
export class UserModule {}
