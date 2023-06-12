import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class SaveTokenDto {
  @IsNotEmpty()
  @IsString()
  public readonly user: Types.ObjectId;

  public readonly refreshToken: string;
}
