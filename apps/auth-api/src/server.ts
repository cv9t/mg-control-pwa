import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import Database from "./database";
import catchError from "./decorators/catch-error";
import errorMiddleware from "./middlewares/error-middleware";

import config from "@/config";
import router from "@/router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", router);

app.use(errorMiddleware);

class Server {
  @catchError("Server start failed:", { withErrorMessage: true })
  public static async start() {
    await Database.connect();
    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  }
}

Server.start();
