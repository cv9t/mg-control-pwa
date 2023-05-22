import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { type Response } from "express";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { type AuthRequest } from "./interfaces/auth-request.interface";
import { type RefreshRequest } from "./interfaces/refresh-request.interface";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post("register")
  public async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.register(registerDto);
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  public async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto);
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  public logout(@Req() req: AuthRequest, @Res() res: Response) {
    res.clearCookie("refreshToken");
    this.authService.logout(req.user.userId);
  }

  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  public async refreshTokens(@Req() req: RefreshRequest, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken: updatedRefreshToken } = await this.authService.refreshTokens(
      req.user.userId,
      req.cookies.refreshToken
    );
    res.cookie("refreshToken", updatedRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }
}
