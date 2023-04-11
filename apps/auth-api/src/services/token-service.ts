import jwt from "jsonwebtoken";

import config from "@/config";
import TokenModel from "@/models/token-model";

class TokenService {
  public generateTokens(payload: string | object | Buffer) {
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
}

export default new TokenService();
