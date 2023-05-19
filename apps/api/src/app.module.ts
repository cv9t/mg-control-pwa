import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { env } from "./config";

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, {
      auth: {
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
      },
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
