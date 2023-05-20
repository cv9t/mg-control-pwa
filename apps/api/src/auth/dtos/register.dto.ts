import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class RegisterDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly activateCode: string;
}
