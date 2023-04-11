import { Router } from "express";

import authController from "@/controllers/auth-controller";
import { validateActivation } from "@/validators/auth-validator";

const router = Router();

router.put("/activate", validateActivation, authController.activate);

export default router;
