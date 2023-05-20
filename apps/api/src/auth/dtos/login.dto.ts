import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class LoginDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
