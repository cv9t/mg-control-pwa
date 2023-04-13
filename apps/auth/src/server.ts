import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import config from "@/config";
import catchError from "@/decorators/catch-error";
import errorMiddleware from "@/middlewares/error-middleware";
import router from "@/router";

import Db from "./db";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", router);

app.use(errorMiddleware);

class Server {
  @catchError(`Ошибка запуска сервера на порте ${config.PORT}`)
  public static async start() {
    await Db.connect();
    app.listen(config.PORT, () => {
      console.log(`Сервер запущен на порте ${config.PORT}`);
    });
  }
}

Server.start();
