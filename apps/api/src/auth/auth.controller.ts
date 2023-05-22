import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { type Response } from "express";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { Cookies } from "@/common/decorators/cookies.decorator";

import { User } from "./decorators/user.decorator";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post("register")
  public async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.register(registerDto);
    res.cookie("refreshToken", refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  public async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto);
    res.cookie("refreshToken", refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  public async logout(@Cookies("refreshToken") refreshToken: string, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return result;
  }

  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  public async refreshTokens(
    @User("id") userId: string,
    @Cookies("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, refreshToken: updatedRefreshToken } = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie("refreshToken", updatedRefreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }
}