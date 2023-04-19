import { Request, Response } from "express";
import { ActivateBody, LoginBody } from "@mg-control/types";

import authService from "@/services/auth.service";
import { routeHandler } from "@/utils/error.utils";

class AuthController {
  @routeHandler
  public async activate(req: Request, res: Response) {
    const body: ActivateBody = req.body;
    const data = await authService.activate(body);
    res.cookie("refreshToken", data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(201).json(data);
  }

  @routeHandler
  public async login(req: Request, res: Response) {
    const body: LoginBody = req.body;
    const data = await authService.login(body);
    res.cookie("refreshToken", data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json(data);
  }

  @routeHandler
  public async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const token = await authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json(token);
  }

  @routeHandler
  public async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const data = await authService.refresh(refreshToken);
    res.cookie("refreshToken", data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json(data);
  }
}

const authController = new AuthController();

export default authController;
