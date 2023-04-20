import { Router } from "express";

import authController from "@/controllers/auth-controller";
import { validateActivateRequest, validateLoginRequest } from "@/validators/auth-validator";

const authRouter = Router();

authRouter.put("/activate", validateActivateRequest, authController.activate);
authRouter.post("/login", validateLoginRequest, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
