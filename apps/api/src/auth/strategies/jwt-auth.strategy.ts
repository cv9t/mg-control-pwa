import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { env } from "@/config";

import { JwtPayload } from "../interfaces/jwt-payload";
import { RequestPayload } from "../interfaces/request-payload.interface";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt") {
  public constructor(private readonly config: env.Config) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.access_secret,
    });
  }

  public validate(payload: JwtPayload): RequestPayload {
    return { userId: payload.sub, deviceId: payload.deviceId };
  }
}
