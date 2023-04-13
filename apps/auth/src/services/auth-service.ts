import { ActivateRequestData, LoginRequestData } from "@mg-control/types";
import bcrypt from "bcrypt";

import UserDto from "@/dtos/user-dto";
import ApiError from "@/exceptions/api-error";
import UserModel from "@/models/user-model";

import tokenService from "./token-service";

class AuthService {
  public async activate({ email, password, activateCode }: ActivateRequestData) {
    const user = await UserModel.findOne({ activateCode });
    if (!user) {
      throw ApiError.BadRequest(`Такого кода активации ${activateCode} не существует`);
    }
    if (user.isActivated) {
      throw ApiError.BadRequest(`Код активации ${activateCode} уже активирован`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    user.email = email;
    user.password = hashPassword;
    user.isActivated = true;
    user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  public async login({ email, password }: LoginRequestData) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователя с таким email ${email} не существует`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
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

  public async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateRefreshToken<UserDto>(refreshToken);
    const token = await tokenService.findToken(refreshToken);
    if (!userData || !token) {
      throw ApiError.Unauthorized();
    }

    const user = await UserModel.findById(userData.id);
    if (!user) {
      throw ApiError.BadRequest(`Пользователя с таким id ${userData.id} не существует`);
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
