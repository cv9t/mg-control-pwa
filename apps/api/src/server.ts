import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import errorMiddleware from "./middlewares/error.middleware";
import config from "./config";
import router from "./router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", router);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, {
      auth: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
      },
    });
    app.listen(config.PORT, () => {
      console.log(`Сервер запущен на порте ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
