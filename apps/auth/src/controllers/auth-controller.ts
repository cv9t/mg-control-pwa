import { Request, Response } from "express";
import { ActivateRequestData, LoginRequestData } from "@mg-control/types";

import catchErrorExpress from "@/decorators/catch-error-express";
import authService from "@/services/auth-service";

class AuthController {
  @catchErrorExpress
  public async activate(req: Request, res: Response) {
    const data: ActivateRequestData = req.body;
    const userData = await authService.activate(data);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(userData);
  }

  @catchErrorExpress
  public async login(req: Request, res: Response) {
    const data: LoginRequestData = req.body;
    const userData = await authService.login(data);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(userData);
  }

  @catchErrorExpress
  public async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const token = await authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  }

  @catchErrorExpress
  public async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const userData = await authService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(userData);
  }
}

const authController = new AuthController();

export default authController;
