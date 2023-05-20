import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";

import LoginDto from "./dtos/login.dto";
import RegisterDto from "./dtos/register.dto";
import JwtAuthGuard from "./guards/jwt-auth.guard";
import JwtRefreshGuard from "./guards/jwt-refresh.guard";
import { type IAuthRequest } from "./interfaces/auth-request.interface";
import { type IRefreshRequest } from "./interfaces/refresh-request.interface";
import AuthService from "./auth.service";

@Controller("auth")
export default class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post("register")
  public register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  public logout(@Req() req: IAuthRequest) {
    const userId = req.user.sub;
    this.authService.logout(userId);
  }

  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  public refreshTokens(@Req() req: IRefreshRequest) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
