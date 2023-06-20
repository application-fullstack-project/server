import { User } from 'src/db/user/user.entity';
import { Post } from './../db/post/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { Like } from 'src/db/like/like.entity';
import { Comment } from 'src/db/comment/comment.entity';
import { LoaderService } from 'src/loader/loader.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Like, Comment])],
  providers: [PostService, PostResolver, UserService, LoaderService],
})
export class PostModule {}
