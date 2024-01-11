import { User } from 'src/db';
import { PostRepository } from './post/post.repository';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTypes } from 'src/config/config.type';
import { Board } from './board/board.entity';
import { Like } from './like/like.entity';
import { Post } from './post/post.entity';
import { Comment } from './comment/comment.entity';
import { CustomRepositoryModule } from './utils/custom-repository.module';
import { UserRepository } from './user/user.repository';
import { LikeRepository } from './like/like.repository';
import { CommentRepository } from './comment/comment.repository';
import { BoardRepository } from './board/board.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigTypes>) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: true,
        logNotifications: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Post, Board, Like, Comment]),
    CustomRepositoryModule.forCustomRepository([
      UserRepository,
      PostRepository,
      LikeRepository,
      CommentRepository,
      BoardRepository,
    ]),
  ],
  exports: [TypeOrmModule, CustomRepositoryModule],
})
export class DatabaseModule {}
