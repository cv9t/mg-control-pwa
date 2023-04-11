import mongoose from "mongoose";

import config from "@/config";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, {
      auth: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
      },
    });
    console.log("Connected to database!");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Database connection error:", err.message);
    }
    process.exit(1);
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from database!");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Database disconnection error:", err.message);
    }
    process.exit(1);
  }
};
