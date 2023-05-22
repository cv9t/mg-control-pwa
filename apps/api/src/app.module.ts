import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { fileLoader, TypedConfigModule } from "nest-typed-config";
import pino from "pino";

import { AuthModule } from "./auth/auth.module";
import { DeviceModule } from "./device/device.module";
import { env } from "./config";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        stream: pino.destination({
          dest: "./app.log",
          sync: false,
        }),
      },
    }),

    TypedConfigModule.forRoot({
      schema: env.Config,
      load: fileLoader(),
    }),

    MongooseModule.forRootAsync({
      imports: [TypedConfigModule],
      useFactory: async (config: env.Config) => ({
        uri: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
        auth: {
          username: config.db.username,
          password: config.db.password,
        },
      }),
      inject: [env.Config],
    }),

    AuthModule,
    DeviceModule,
  ],
})
export class AppModule {}
