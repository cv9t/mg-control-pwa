import { Request } from "express";

import { ITokenPayload } from "./token-payload.interface";

export interface IAuthRequest extends Request {
  user: ITokenPayload;
}
