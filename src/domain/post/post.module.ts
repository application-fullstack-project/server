import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { LoaderService } from 'src/loader/loader.service';
import { DatabaseModule } from 'src/db';

@Module({
  imports: [DatabaseModule],
  providers: [PostService, PostResolver, LoaderService],
})
export class PostModule {}
