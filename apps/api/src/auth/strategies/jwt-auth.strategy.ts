import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { env } from "@/config";

import { AuthUser } from "../interfaces/auth-user.interface";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt") {
  public constructor(private readonly config: env.Config) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.access_secret,
    });
  }

  public validate(payload: JwtPayload): AuthUser {
    return { id: payload.sub, deviceId: payload.deviceId };
  }
}
