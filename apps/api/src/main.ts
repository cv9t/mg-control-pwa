import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import AppModule from "./app.module";
import { env } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api/v1");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(env.Config);

  await app.listen(config.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
