import { ActivateRequestData, LoginRequestData } from "@mg-control/types";

import UserDto from "@/dtos/user-dto";
import ApiError from "@/exceptions/api-error";
import { hashPassword, isPassValid } from "@/utils/password-utils";

import deviceService from "./device-service";
import tokenService from "./token-service";
import userService from "./user-service";

class AuthService {
  public async activate({ email, password, activateCode }: ActivateRequestData) {
    const device = await deviceService.findDeviceByActivateCode(activateCode);
    if (!device) {
      throw ApiError.BadRequest("Неверный код активации");
    }
    if (device.isActivated) {
      throw ApiError.BadRequest("Код активации уже использован");
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      throw ApiError.BadRequest(`Пользователь с таким email уже зарегистрирован`);
    }

    const user = await userService.createUser({
      device: device.id,
      email,
      password: hashPassword(password),
    });

    device.isActivated = true;
    await device.save();

    const tokens = tokenService.generateTokens({ ...new UserDto(user) });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }

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
