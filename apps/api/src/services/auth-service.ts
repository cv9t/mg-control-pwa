import { LoginRequestData } from "@mg-control/types";

import UserDto from "@/dtos/user-dto";
import ApiError from "@/exceptions/api-error";
import { isPassValid } from "@/utils/password-utils";

import tokenService from "./token-service";
import userService from "./user-service";

class AuthService {
  public async login({ email, password }: LoginRequestData) {
    const user = await userService.findUserByEmail(email);
    if (!user || !isPassValid(password, user.password)) {
      throw ApiError.Unauthorized("Неверный адрес электронной почты или пароль");
    }

    const tokens = tokenService.generateTokens({ ...new UserDto(user) });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }

  public async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized("Не удалось найти refresh token");
    }

    const payload = tokenService.verifyRefreshToken<UserDto>(refreshToken);
    const existingRefreshToken = await tokenService.findToken(refreshToken);
    if (!payload || !existingRefreshToken) {
      throw ApiError.Unauthorized("Неверный refresh token");
    }

    const user = await userService.findUserById(payload.id);
    if (!user) {
      throw ApiError.Unauthorized("Не удалось найти пользователя");
    }

    const tokens = tokenService.generateTokens({ ...new UserDto(user) });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }
}

const authService = new AuthService();

export default authService;
