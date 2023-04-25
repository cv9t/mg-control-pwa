import { Router } from "express";

import authController from "@/controllers/auth-controller";
import authMiddleware from "@/middlewares/auth-middleware";
import { validateActivateRequest, validateLoginRequest } from "@/validators/auth-validator";

const authRouter = Router();

authRouter.post("/activate", validateActivateRequest, authController.activate);
authRouter.post("/login", validateLoginRequest, authController.login);
authRouter.post("/logout", authMiddleware, authController.logout);
authRouter.get("/refresh-token", authMiddleware, authController.refreshToken);

export default authRouter;
