import { Router } from "express";

import authController from "@/controllers/auth-controller";
import { validateActivate, validateLogin } from "@/validators/auth-validator";

const router = Router();

router.put("/auth/activate", validateActivate, authController.activate);
router.post("/auth/login", validateLogin, authController.login);
router.post("/auth/logout", authController.logout);
router.get("/auth/refresh", authController.refresh);

export default router;
