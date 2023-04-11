import { NextFunction, Request, Response } from "express";

import { ObjectSchema } from "joi";

export default <T>(schema: ObjectSchema<T>) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    next(error);
  };
