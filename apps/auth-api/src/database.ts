import mongoose from "mongoose";

import catchError from "./decorators/catch-error";

import config from "@/config";

export default class Database {
  @catchError("Database connection error:", {
    withErrorMessage: true,
  })
  public static async connect() {
    await mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, {
      auth: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
      },
    });
    console.log("Connected to database!");
  }

  @catchError("Database disconnection error:", {
    withErrorMessage: true,
  })
  public static async disconnect() {
    await mongoose.disconnect();
    console.log("Disconnected from database!");
  }
}
