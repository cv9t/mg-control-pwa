import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { fileLoader, TypedConfigModule } from 'nest-typed-config';
import { LoggerModule } from 'nestjs-pino';

import { env } from '../config';
import { AuthModule } from '../modules/auth/auth.module';
import { DeviceModule } from '../modules/device/device.module';

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
      load: fileLoader({ searchFrom: 'apps/api' }),
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
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
