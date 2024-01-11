import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { ConfigService } from '@nestjs/config';

async function runApplication(
  app: INestApplication,
  configService: ConfigService,
) {
  // pipe 설정하기
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const error_messages = errors.map((error) =>
          Object.values(error.constraints),
        );
        return new GraphQLError(error_messages.join(', '));
      },
    }),
  );

  // cors 설정하기
  app.enableCors();

  // 실행하기
  const port = configService.get<number>('APP_PORT', 3000);
  await app.listen(port);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await runApplication(app, configService);
}
bootstrap();
