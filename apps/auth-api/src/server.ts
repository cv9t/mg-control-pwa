import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import config from "@/config";
import router from "@/router";
import { connect } from "@/utils/db";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", router);

const startServer = async (): Promise<void> => {
  try {
    await connect();
    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("Server failed:", err.message);
    }
  }
};

startServer();
