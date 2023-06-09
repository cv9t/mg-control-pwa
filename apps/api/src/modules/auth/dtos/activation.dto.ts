import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ActivationDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly activationCode: string;
}
