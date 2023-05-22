import { Types } from "mongoose";

export class CreateUserDto {
  public readonly device: Types.ObjectId;

  public readonly email: string;

  public readonly password: string;
}
