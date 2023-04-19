import { ActivateBody, LoginBody } from "@mg-control/types";

import UserDto from "@/dtos/user.dto";
import ApiError from "@/exceptions/api.error";
import { Bind } from "@/utils/class.utils";
import { hashPassword, isPassValid } from "@/utils/password.utils";

import deviceService from "./device.service";
import tokenService from "./token.service";
import userService from "./user.service";

class AuthService {
  @Bind
  public async activate({ email, password, activateCode }: ActivateBody) {
    const device = await deviceService.findDeviceByActivateCode(activateCode);
    if (!device) {
      throw ApiError.BadRequest(`Такого кода активации ${activateCode} не существует`);
    }
    if (device.isActivated) {
      throw ApiError.BadRequest(`Код активации ${activateCode} уже использован`);
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      throw ApiError.BadRequest(`Пользователь с таким email ${email} уже есть`);
    }

    const user = await userService.createUser({
      device: device.id,
      email,
      password: hashPassword(password),
    });

    await deviceService.updateDevice(device.id, { isActivated: true });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  @Bind
  public async login({ email, password }: LoginBody) {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw ApiError.BadRequest(`Пользователя с таким email ${email} не существует`);
    }

    if (!isPassValid(password, user.password)) {
      throw ApiError.BadRequest("Неправильный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  @Bind
  public async logout(refreshToken: string) {
    return tokenService.removeToken(refreshToken);
  }

  @Bind
  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const payload = tokenService.verifyRefreshToken<UserDto>(refreshToken);
    const token = await tokenService.findToken(refreshToken);
    if (!payload || !token) {
      throw ApiError.Unauthorized();
    }

    const user = await userService.findUserById(payload.id);
    if (!user) {
      throw ApiError.BadRequest(`Пользователя с таким id ${payload.id} не существует`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

const authService = new AuthService();

export default authService;
