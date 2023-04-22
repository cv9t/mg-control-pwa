import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import errorMiddleware from "./middlewares/error-middleware";
import { env } from "./config";
import router from "./router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/v1", router);

app.use(errorMiddleware);

const startServer = async (port: string) => {
  try {
    await mongoose.connect(`mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, {
      auth: {
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
      },
    });
    app.listen(port, () => {
      console.log(`Сервер запущен на порте ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer(env.PORT);
