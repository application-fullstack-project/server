import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLError } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3000);
}
bootstrap();
