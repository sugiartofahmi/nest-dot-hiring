import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { config } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.port;
  const globalPrefix = 'api';

  app.useGlobalPipes(new ZodValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
