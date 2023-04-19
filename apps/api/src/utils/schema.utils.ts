import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import ApiError from "@/exceptions/api.error";

export const validateSchema =
  <T>(schema: ObjectSchema<T>) =>
  (data: T) => {
    const { error } = schema.validate(data);
    return {
      error: error
        ? {
            ...error,
            errors: error.details.flatMap((d) => d.message),
          }
        : undefined,
    };
  };

export const validateRequest =
  <T>(schema: ObjectSchema<T>) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { error } = validateSchema(schema)(req.body);
    if (error) {
      return next(ApiError.BadRequest(`Неверные данные: ${error.message}`, error.errors));
    }
    next();
  };
