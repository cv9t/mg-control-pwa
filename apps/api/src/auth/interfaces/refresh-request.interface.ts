import { ITokenPayload } from "./token-payload.interface";

export interface IRefreshRequest {
  user: ITokenPayload & {
    refreshToken: string;
  };
}
