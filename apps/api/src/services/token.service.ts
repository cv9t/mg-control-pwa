import jwt from "jsonwebtoken";

import config from "@/config";
import TokenModel from "@/models/token.model";

type JWTPayload = string | object | Buffer;

class TokenService {
  public generateTokens<T extends JWTPayload>(payload: T) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  public verifyAccessToken<T extends JWTPayload>(token: string) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET_KEY) as T;
    } catch {
      return null;
    }
  }

  public verifyRefreshToken<T extends JWTPayload>(token: string) {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET_KEY) as T;
    } catch {
      return null;
    }
  }

  public async saveToken(userId: string, refreshToken: string) {
    const existingToken = await TokenModel.findByUserId(userId);
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      return existingToken.save();
    }
    return TokenModel.create({ user: userId, refreshToken });
  }

  public async findToken(refreshToken: string) {
    return TokenModel.findOne({ refreshToken });
  }

  public async removeToken(refreshToken: string) {
    return TokenModel.deleteOne({ refreshToken });
  }
}

const tokenService = new TokenService();

export default tokenService;
