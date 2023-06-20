import { Like } from 'src/db/like/like.entity';
import { Module } from '@nestjs/common';
import { LoaderService } from './loader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { Post } from 'src/db/post/post.entity';
import { Comment } from 'src/db/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Like, Comment])],
  providers: [LoaderService, PostService],
  exports: [LoaderService],
})
export class LoaderModule {}
