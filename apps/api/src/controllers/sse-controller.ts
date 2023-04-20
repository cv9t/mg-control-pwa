import { Response } from "express";

import sseService from "@/services/sse-service";
import { AuthenticatedRequest } from "@/types";
import { RouteHandler } from "@/utils/class-utils";

class SseController {
  @RouteHandler
  public async connectUser(req: AuthenticatedRequest, res: Response) {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    await sseService.addUser(req.user, res);
  }
}

const sseController = new SseController();

export default sseController;
