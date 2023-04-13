import jwt from "jsonwebtoken";

import config from "@/config";
import catchErrorJwt from "@/decorators/catch-error-jwt";
import TokenModel from "@/models/token-model";

type JWTPayload = string | object | Buffer;

class TokenService {
  @catchErrorJwt
  public validateAccessToken<T extends JWTPayload>(token: string) {
    const userData = jwt.verify(token, config.JWT_ACCESS_SECRET_KEY) as T;
    return userData;
  }

  @catchErrorJwt
  public validateRefreshToken<T extends JWTPayload>(token: string) {
    try {
      const userData = jwt.verify(token, config.JWT_REFRESH_SECRET_KEY) as T;
      return userData;
    } catch {
      return null;
    }
  }

  public generateTokens<T extends JWTPayload>(payload: T) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  public async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  public async removeToken(refreshToken: string) {
    const token = await TokenModel.deleteOne({ refreshToken });
    return token;
  }

  public async findToken(refreshToken: string) {
    const token = await TokenModel.findOne({ refreshToken });
    return token;
  }
}

const tokenService = new TokenService();

export default tokenService;
