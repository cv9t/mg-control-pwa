import { Request } from "express";

import UserDto from "@/dtos/user-dto";

export interface AuthenticatedRequest extends Request {
  user?: UserDto;
}
