import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
