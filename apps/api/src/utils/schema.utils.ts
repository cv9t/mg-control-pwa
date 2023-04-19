import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import ApiError from "@/exceptions/api.error";

export const validateSchema =
  <T>(schema: ObjectSchema<T>) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(
        ApiError.BadRequest(
          `Неверные данные: ${error.message}`,
          error.details.flatMap((d) => d.message)
        )
      );
    }
    next();
  };
