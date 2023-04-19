import { Router } from "express";

import deviceController from "@/controllers/device.controller";

const deviceRouter = Router();

deviceRouter.get("/subscribe/:deviceId", deviceController.subscribeToDevice);

export default deviceRouter;
