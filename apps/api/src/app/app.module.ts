import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { dotenvLoader, TypedConfigModule } from 'nest-typed-config';
import { LoggerModule } from 'nestjs-pino';

import { env } from '../config';
import { AuthModule } from '../modules/auth/auth.module';
import { DevicesModule } from '../modules/devices/devices.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    TypedConfigModule.forRoot({
      schema: env.Config,
      load: dotenvLoader({
        envFilePath: ['apps/api/.env'],
        separator: '__',
      }),
      normalize(config) {
        config.port = parseInt(config.port, 10);
        config.db.port = parseInt(config.db.port, 10);
        return config;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [TypedConfigModule],
      inject: [env.Config],
      useFactory: async (config: env.Config) => ({
        uri: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
        auth: {
          username: config.db.username,
          password: config.db.password,
        },
      }),
    }),
    AuthModule,
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
