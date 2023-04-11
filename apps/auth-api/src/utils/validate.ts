import { NextFunction, Request, Response } from "express";

import { ObjectSchema } from "joi";

export default function <T>(schema: ObjectSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): Response | undefined => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.flatMap((d) => d.message).join(", ");
      return res.status(400).json({ message });
    }
    next();
  };
}
