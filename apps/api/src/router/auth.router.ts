import { Router } from "express";

import authController from "@/controllers/auth.controller";
import { validateActivate, validateLogin } from "@/validators/auth.validator";

const authRouter = Router();

authRouter.put("/activate", validateActivate, authController.activate);
authRouter.post("/login", validateLogin, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
