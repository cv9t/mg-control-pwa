import { Router } from "express";

import authController from "@/controllers/auth-controller";
import { validateActivateRequest, validateLoginRequest } from "@/validators/auth-validator";

const authRouter = Router();

authRouter.post("/activate", validateActivateRequest, authController.activate);
authRouter.post("/login", validateLoginRequest, authController.login);
authRouter.get("/refresh-token", authController.refreshToken);

export default authRouter;
