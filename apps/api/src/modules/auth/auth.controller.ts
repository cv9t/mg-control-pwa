import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';

import { type Response } from 'express';

import { DeleteResult } from '@mg-control/api/common/types/mongoose.types';
import { env } from '@mg-control/api/config';
import { ActivationDto, SignInDto } from '@mg-control/shared/dtos';
import { AuthResponse } from '@mg-control/shared/types';

import { Cookies } from './decorators/cookies.decorator';
import { User } from './decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  public constructor(private readonly config: env.Config, private readonly authService: AuthService) {}

  @Post('activate')
  public async activate(@Body() activationDto: ActivationDto): Promise<void> {
    await this.authService.activate(activationDto);
  }

  @Post('sign-in')
  public async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponse> {
    const { accessToken, refreshToken } = await this.authService.signIn(signInDto);
    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      domain: this.config.frontend.domain,
    });
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  public async signOut(@Cookies('refreshToken') refreshToken: string, @Res({ passthrough: true }) res: Response): Promise<DeleteResult> {
    const result = await this.authService.signOut(refreshToken);
    res.clearCookie('refreshToken');
    return result;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh-tokens')
  public async refreshTokens(
    @User('id') userId: string,
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { accessToken, refreshToken: updatedRefreshToken } = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie('refreshToken', updatedRefreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      domain: this.config.frontend.domain,
    });
    return { accessToken };
  }
}
