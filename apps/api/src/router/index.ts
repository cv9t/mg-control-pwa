import { Router } from "express";

import authRouter from "./auth.router";
import deviceRouter from "./device.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/device", deviceRouter);

export default router;
