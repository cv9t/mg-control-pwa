import { Request, Response } from "express";

import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/types";
import { RouteHandler } from "@/utils/class-utils";

class AuthController {
  @RouteHandler
  public async activate(req: Request, res: Response) {
    const { accessToken, refreshToken } = await authService.activate(req.body);
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(201).json({ accessToken });
  }

  @RouteHandler
  public async login(req: Request, res: Response) {
    const { accessToken, refreshToken } = await authService.login(req.body);
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ accessToken });
  }

  @RouteHandler
  public async logout(req: AuthenticatedRequest, res: Response) {
    const result = await authService.logout(req.cookies.refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json(result);
  }

  @RouteHandler
  public async refreshToken(req: AuthenticatedRequest, res: Response) {
    const { accessToken, refreshToken } = await authService.refreshToken(req.cookies.refreshToken);
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ accessToken });
  }
}

const authController = new AuthController();

export default authController;
