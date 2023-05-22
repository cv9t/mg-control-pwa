import { Request } from "express";

import { RequestPayload } from "./request-payload.interface";

export interface AuthRequest extends Request {
  user: RequestPayload;
}
