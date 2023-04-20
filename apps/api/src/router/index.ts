import { Router } from "express";

import authRouter from "./auth-router";
import sseRouter from "./sse-router";

const router = Router();

router.use("/auth", authRouter);
router.use("/sse", sseRouter);

export default router;
