import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PostModule } from './domain/post/post.module';
import { BoardModule } from './domain/board/board.module';
import { LoaderModule } from './loader/loader.module';
import { LoaderService } from './loader/loader.service';
import { ConfigTypes } from './config/config.type';
import { DatabaseModule } from './db/database.module';
import { CommentModule } from './domain/comment/comment.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [LoaderModule],
      inject: [LoaderService],
      useFactory: (loaderService: LoaderService) => ({
        autoSchemaFile: 'schema.gql',
        sortSchema: true,
        context: () => ({
          likeByPostLoader: loaderService.getLikesByPostId(),
          commentByPostLoader: loaderService.getCommentsByPostId(),
        }),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object<ConfigTypes>({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
    BoardModule,
    CommentModule,
  ],
  controllers: [AppController],
  exports: [DatabaseModule],
})
export class AppModule {}
