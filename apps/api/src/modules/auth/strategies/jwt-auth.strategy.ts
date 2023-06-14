import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Config } from '@mg-control/api/config';

import { AuthService } from '../auth.service';
import { AuthUser } from '../interfaces/auth-user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(private readonly config: Config, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.access_secret,
    });
  }

  public async validate(payload: JwtPayload): Promise<AuthUser> {
    await this.authService.validatePayload(payload);
    return { id: payload.sub, deviceId: payload.deviceId };
  }
}
