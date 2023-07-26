import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ActivationDto {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  public readonly activationCode: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}
