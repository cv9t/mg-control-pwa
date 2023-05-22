import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { env } from "@/config";

import { JwtPayload } from "../interfaces/jwt-payload";
import { RequestPayload } from "../interfaces/request-payload.interface";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  public constructor(private readonly config: env.Config) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.refresh_secret,
      passReqToCallback: true,
    });
  }

  public validate(payload: JwtPayload): RequestPayload {
    return { userId: payload.sub, deviceId: payload.deviceId };
  }
}
