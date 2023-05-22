import { Request } from "express";

import { RequestPayload } from "./request-payload.interface";

export interface RefreshRequest extends Request {
  user: RequestPayload;
}
