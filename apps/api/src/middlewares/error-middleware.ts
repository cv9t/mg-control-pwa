import { NextFunction, Request, Response } from "express";

import ApiError from "@/exceptions/api-error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error.message);
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }
  res.status(500).json({ message: "Непредвиденная ошибка сервера" });
};

export default errorMiddleware;
