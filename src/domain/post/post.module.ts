import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { UserService } from 'src/domain/user/user.service';
import { LoaderService } from 'src/loader/loader.service';
import { DatabaseModule } from 'src/db';

@Module({
  imports: [DatabaseModule],
  providers: [PostService, PostResolver, UserService, LoaderService],
})
export class PostModule {}
