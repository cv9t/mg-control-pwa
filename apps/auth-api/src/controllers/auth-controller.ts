import { Request, Response } from "express";

import { ActivationRequestData } from "@mg-control/types";

import catchErrorExpress from "@/decorators/catch-error-express";
import authService from "@/services/auth-service";

class AuthController {
  @catchErrorExpress
  public async activate(req: Request, res: Response) {
    const data: ActivationRequestData = req.body;
    const userData = await authService.activate(data);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(userData);
  }
}

export default new AuthController();
