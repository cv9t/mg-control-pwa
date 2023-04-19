import jwt from "jsonwebtoken";

import config from "@/config";
import TokenModel from "@/models/token.model";
import { Bind } from "@/utils/class.utils";

type JWTPayload = string | object | Buffer;

class TokenService {
  @Bind
  public generateTokens<T extends JWTPayload>(payload: T) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  @Bind
  public verifyAccessToken<T extends JWTPayload>(token: string) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET_KEY) as T;
    } catch {
      return null;
    }
  }

  @Bind
  public verifyRefreshToken<T extends JWTPayload>(token: string) {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET_KEY) as T;
    } catch {
      return null;
    }
  }

  @Bind
  public async saveToken(userId: string, refreshToken: string) {
    const existingToken = await TokenModel.findOne({ userId });
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      return existingToken.save();
    }
    return TokenModel.create({ user: userId, refreshToken });
  }

  @Bind
  public async findToken(refreshToken: string) {
    return TokenModel.findOne({ refreshToken });
  }

  @Bind
  public async removeToken(refreshToken: string) {
    return TokenModel.deleteOne({ refreshToken });
  }
}

const tokenService = new TokenService();

export default tokenService;
