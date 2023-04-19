import { NextFunction, Request, Response } from "express";

import ApiError from "@/exceptions/api.error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message);
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  } else {
    res.status(500).json({ message: "Непредвиденная ошибка сервера" });
  }
};

export default errorMiddleware;