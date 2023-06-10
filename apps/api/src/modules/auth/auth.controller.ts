import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';

import { type Response } from 'express';

import { DeleteResult } from '@mg-control/api/common/types';

import { Cookies } from './decorators/cookies.decorator';
import { User } from './decorators/user.decorator';
import { ActivationDto } from './dtos/activation.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './auth.service';
import { AuthResponse } from './types';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('activate')
  public async activate(
    @Body() activationDto: ActivationDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { accessToken, refreshToken } = await this.authService.activate(activationDto);
    res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { accessToken, refreshToken } = await this.authService.signIn(signInDto);
    res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  public async logout(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<DeleteResult> {
    const result = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return result;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  public async refreshTokens(
    @User('id') userId: string,
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { accessToken, refreshToken: updatedRefreshToken } = await this.authService.refreshTokens(
      userId,
      refreshToken,
    );
    res.cookie('refreshToken', updatedRefreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { accessToken };
  }
}
