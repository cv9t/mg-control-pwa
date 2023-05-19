import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { Public } from "./decorators/public.decorator";
import { SignInDto } from "./dtos/sign-in.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signIn")
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
