import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DeleteResult } from '@mg-control/api/common/types';
import { Config } from '@mg-control/api/config';
import { DevicesService } from '@mg-control/api/modules/devices/devices.service';
import { TokensService } from '@mg-control/api/modules/tokens/tokens.service';
import { UsersService } from '@mg-control/api/modules/users/users.service';
import { ActivationDto, SignInDto } from '@mg-control/shared/dtos';
import { ERROR_TYPE } from '@mg-control/shared/typings';

import { hashData, verifyHashedData } from './helpers/crypto.helpers';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreatedTokens } from './types';

@Injectable()
export class AuthService {
  public constructor(
    private readonly config: Config,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly devicesService: DevicesService,
    private readonly tokensService: TokensService,
  ) {}

  public async activate(activationDto: ActivationDto): Promise<CreatedTokens> {
    const existingDevice = await this.devicesService.findByActivationCode(
      activationDto.activationCode,
    );
    if (!existingDevice) {
      throw new BadRequestException({
        type: ERROR_TYPE.invalid_activation_code,
        message: 'Invalid activation code',
      });
    }
    if (existingDevice.isActivated) {
      throw new BadRequestException({
        type: ERROR_TYPE.device_already_activated,
        message: 'Device already activated',
      });
    }

    const existingUser = await this.usersService.findByEmail(activationDto.email);
    if (existingUser) {
      throw new BadRequestException({
        type: ERROR_TYPE.user_already_exists,
        message: 'User already exists',
      });
    }

    const createdUser = await this.usersService.create({
      device: existingDevice._id,
      email: activationDto.email,
      password: hashData(activationDto.password),
    });
    await this.devicesService.update(existingDevice.id, { isActivated: true });

    const tokens = await this._createTokens({ deviceId: existingDevice.id, sub: createdUser.id });
    await this.tokensService.save({ user: createdUser._id, refreshToken: tokens.refreshToken });
    return tokens;
  }

  public async signIn(signInDto: SignInDto): Promise<CreatedTokens> {
    const existingUser = await this.usersService.findByEmail(signInDto.email);
    if (!existingUser) {
      throw new BadRequestException({
        type: ERROR_TYPE.invalid_credentials,
        message: 'Invalid email and/or password',
      });
    }

    const passwordMatches = verifyHashedData(signInDto.password, existingUser.password);
    if (!passwordMatches) {
      throw new BadRequestException({
        type: ERROR_TYPE.invalid_credentials,
        message: 'Invalid email and/or password',
      });
    }

    const tokens = await this._createTokens({
      deviceId: existingUser.device.toString(),
      sub: existingUser.id,
    });
    await this.tokensService.save({ user: existingUser._id, refreshToken: tokens.refreshToken });
    return tokens;
  }

  public async signOut(refreshToken: string): Promise<DeleteResult> {
    const existingToken = this.tokensService.findByRefreshToken(refreshToken);
    if (!existingToken) {
      throw new UnauthorizedException({
        type: ERROR_TYPE.invalid_token,
        message: 'Invalid token',
      });
    }
    return this.tokensService.remove(refreshToken);
  }

  public async refreshTokens(userId: string, refreshToken: string): Promise<CreatedTokens> {
    const existingUser = await this.usersService.findById(userId);
    if (!existingUser) {
      throw new UnauthorizedException({
        type: ERROR_TYPE.user_does_not_exists,
        message: 'User does not exists',
      });
    }

    const existingRefreshToken = await this.tokensService.findByRefreshToken(refreshToken);
    if (!existingRefreshToken) {
      throw new UnauthorizedException({
        type: ERROR_TYPE.invalid_token,
        message: 'Invalid token',
      });
    }

    const tokens = await this._createTokens({
      deviceId: existingUser.device.toString(),
      sub: existingUser.id,
    });
    await this.tokensService.save({ user: existingUser._id, refreshToken: tokens.refreshToken });
    return tokens;
  }

  private async _createTokens(payload: JwtPayload): Promise<CreatedTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.config.jwt.access_secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.config.jwt.refresh_secret,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
