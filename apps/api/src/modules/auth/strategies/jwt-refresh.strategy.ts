import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { type Request } from 'express';
import { Strategy } from 'passport-jwt';

import { Config } from '@mg-control/api/config';

import { AuthService } from '../auth.service';
import { AuthUser } from '../interfaces/auth-user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  public constructor(private readonly config: Config, private readonly authService: AuthService) {
    super({
      jwtFromRequest: JwtRefreshStrategy.extractJwt,
      secretOrKey: config.jwt.refresh_secret,
      passReqToCallback: true,
    });
  }

  private static extractJwt(req: Request): string | null {
    if (req.cookies && req.cookies.refreshToken) {
      return req.cookies.refreshToken;
    }
    return null;
  }

  public async validate(_req: Request, payload: JwtPayload): Promise<AuthUser> {
    await this.authService.validatePayload(payload);
    return { id: payload.sub, deviceId: payload.deviceId };
  }
}
