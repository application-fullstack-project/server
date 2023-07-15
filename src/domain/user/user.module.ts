import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
