import mongoose from "mongoose";

import config from "@/config";

import catchError from "./decorators/catch-error";

class Db {
  @catchError("Ошибка подключения бд")
  public static async connect() {
    await mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, {
      auth: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
      },
    });
    console.log("Бд подключена");
  }

  @catchError("Ошибка отключения бд")
  public static async disconnect() {
    await mongoose.disconnect();
    console.log("Бд отключена");
  }
}

export default Db;
