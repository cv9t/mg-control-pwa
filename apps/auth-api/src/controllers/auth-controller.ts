import { Request, Response } from "express";

import { ActivationRequestData } from "@mg-control/types";

import authService from "@/services/auth-service";

class AuthController {
  public async activate(req: Request, res: Response): Promise<any> {
    try {
      const data: ActivationRequestData = req.body;
      const userData = await authService.activate(data);

      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.json(userData);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

const authController = new AuthController();

export default authController;
