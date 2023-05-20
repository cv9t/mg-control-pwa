import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { env } from "@/config";

import { ITokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  public constructor(private readonly config: env.Config) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.refresh_secret,
      passReqToCallback: true,
    });
  }

  public validate(req: Request, payload: ITokenPayload) {
    const refreshToken = req.get("Authorization")?.replace("Bearer", "").trim() ?? "";
    return { ...payload, refreshToken };
  }
}
