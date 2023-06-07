import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import { env } from './config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(env.Config);

  app.setGlobalPrefix('/api/v1');
  app.enableCors();

  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(config.port);
}

bootstrap();
