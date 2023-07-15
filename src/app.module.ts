import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { UserModule } from './domain/user';
import { AuthModule } from './domain/auth';
import { CommentModule } from './domain/comment';
import { HealthModule } from './domain/health';
import { PostModule } from './domain/post';
import { BoardModule } from './domain/board';

import { LoaderModule, LoaderService } from './loader';

import { ConfigTypes } from './config/config.type';
import { DatabaseModule } from './db';

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
    HealthModule,
  ],
  exports: [DatabaseModule],
})
export class AppModule {}
