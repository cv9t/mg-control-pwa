import { Router } from "express";

import sseController from "@/controllers/sse.controller";
import authMiddleware from "@/middlewares/auth.middleware";

const sseRouter = Router();

sseRouter.get("/connect", authMiddleware, sseController.connectUser);

export default sseRouter;
