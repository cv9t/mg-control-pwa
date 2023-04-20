import { NextFunction, Response } from "express";

import UserDto from "@/dtos/user-dto";
import ApiError from "@/exceptions/api-error";
import tokenService from "@/services/token-service";
import { AuthenticatedRequest } from "@/types";

const authMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.Unauthorized());
    }

    const [, accessToken] = authHeader.split(" ");
    if (!accessToken) {
      return next(ApiError.Unauthorized());
    }

    const payload = tokenService.verifyAccessToken<UserDto>(accessToken);
    if (!payload) {
      return next(ApiError.Unauthorized());
    }

    req.user = payload;
    next();
  } catch (e) {
    next(ApiError.Unauthorized());
  }
};

export default authMiddleware;
