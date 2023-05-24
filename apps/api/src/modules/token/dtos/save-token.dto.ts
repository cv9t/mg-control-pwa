import { Types } from "mongoose";

export class SaveTokenDto {
  public readonly user: Types.ObjectId;

  public readonly refreshToken: string;
}
