import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { ERROR_TYPE } from '@mg-control/shared/typings';

import AppModule from './app/app.module';
import { Config } from './config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(Config);

  app.setGlobalPrefix('/api/v1');
  app.enableCors({ origin: config.frontend.url, credentials: true });

  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException({
          type: ERROR_TYPE.validation_error,
          message: errors.flatMap(({ constraints }) => Object.values(constraints)),
        }),
    }),
  );

  await app.listen(config.port);
};

bootstrap();
