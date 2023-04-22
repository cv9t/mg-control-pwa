import { Request, Response } from "express";

import authService from "@/services/auth-service";
import { RouteHandler } from "@/utils/class-utils";

class AuthController {
  // @RouteHandler
  // public async activate(req: Request, res: Response) {
  //   const body: ActivateRequestData = req.body;
  //   const data = await authService.activate(body);
  //   res.cookie("refreshToken", data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  //   res.status(201).json(data);
  // }

  @RouteHandler
  public async login(req: Request, res: Response) {
    const { accessToken, refreshToken } = await authService.login(req.body);
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ accessToken });
  }

  // @RouteHandler
  // public async logout(req: Request, res: Response) {
  //   const { refreshToken } = req.cookies;
  //   const token = await authService.logout(refreshToken);
  //   res.clearCookie("refreshToken");
  //   res.status(200).json(token);
  // }

  @RouteHandler
  public async refreshToken(req: Request, res: Response) {
    const { accessToken, refreshToken } = await authService.refreshToken(req.cookies.refreshToken);
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ accessToken });
  }
}

const authController = new AuthController();

export default authController;
