import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { env } from "@/config";

import { ITokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export default class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt") {
  public constructor(private readonly config: env.Config) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.access_secret,
    });
  }

  public validate(payload: ITokenPayload) {
    return payload;
  }
}
