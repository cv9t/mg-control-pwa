import { ActivationRequestData } from "@mg-control/types";
import bcrypt from "bcrypt";

import tokenService from "./token-service";

import UserDto from "@/dtos/user-dto";
import ApiError from "@/exceptions/api-error";
import UserModel from "@/models/user-model";

class AuthService {
  public async activate({ email, password, activationCode }: ActivationRequestData) {
    const userData = await UserModel.findOne({ activationCode });
    if (!userData) {
      throw ApiError.BadRequest(`Такого кода активации ${activationCode} не зарегистрировано`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    userData.email = email;
    userData.password = hashPassword;
    userData.isActivated = true;
    userData.save();

    const userDto = new UserDto(userData);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new AuthService();
