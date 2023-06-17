import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DeleteResult } from '@mg-control/api/common/types';
import { env } from '@mg-control/api/config';
import { DevicesService } from '@mg-control/api/modules/devices/devices.service';
import { TokensService } from '@mg-control/api/modules/tokens/tokens.service';
import { UsersService } from '@mg-control/api/modules/users/users.service';
import { ActivationDto, SignInDto } from '@mg-control/shared/dtos';
import { ERROR_TYPE } from '@mg-control/shared/types';

import { hashData, verifyHashedData } from './helpers/crypto.helpers';
import { CreatedTokens } from './interfaces/created-tokens.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  public constructor(
    private readonly config: env.Config,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly devicesService: DevicesService,
    private readonly tokensService: TokensService,
  ) {}

  public async activate(activationDto: ActivationDto): Promise<void> {
    const existingDevice = await this.devicesService.findByActivationCode(
      activationDto.activationCode,
    );
    if (!existingDevice) {
      throw new BadRequestException({ type: ERROR_TYPE.invalid_activation_code });
    }
    if (existingDevice.isActivated) {
      throw new BadRequestException({ type: ERROR_TYPE.device_already_activated });
    }

    const existingUser = await this.usersService.findByEmail(activationDto.email);
    if (existingUser) {
      throw new BadRequestException({ type: ERROR_TYPE.user_already_exists });
    }

    await this.usersService.create({
      device: existingDevice._id,
      email: activationDto.email,
      password: hashData(activationDto.password),
    });
    await this.devicesService.update(existingDevice.id, { isActivated: true });
  }

  public async signIn(signInDto: SignInDto): Promise<CreatedTokens> {
    const existingUser = await this.usersService.findByEmail(signInDto.email);
    if (!existingUser || !verifyHashedData(signInDto.password, existingUser.password)) {
      throw new BadRequestException({ type: ERROR_TYPE.invalid_credentials });
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
      throw new UnauthorizedException({ type: ERROR_TYPE.invalid_token });
    }
    return this.tokensService.remove(refreshToken);
  }

  public async refreshTokens(userId: string, refreshToken: string): Promise<CreatedTokens> {
    const existingUser = await this.usersService.findById(userId);
    if (!existingUser) {
      throw new UnauthorizedException({ type: ERROR_TYPE.user_does_not_exists });
    }

    const existingRefreshToken = await this.tokensService.findByRefreshToken(refreshToken);
    if (!existingRefreshToken) {
      throw new UnauthorizedException({ type: ERROR_TYPE.invalid_token });
    }

    const tokens = await this._createTokens({
      deviceId: existingUser.device.toString(),
      sub: existingUser.id,
    });
    await this.tokensService.save({ user: existingUser._id, refreshToken: tokens.refreshToken });
    return tokens;
  }

  public async validatePayload(payload: JwtPayload): Promise<void> {
    const existingUser = await this.usersService.findById(payload.sub);
    if (!existingUser) {
      throw new UnauthorizedException({ type: ERROR_TYPE.user_does_not_exists });
    }

    const existingDevice = await this.devicesService.findById(payload.deviceId);
    if (!existingDevice) {
      throw new UnauthorizedException({ type: ERROR_TYPE.device_does_not_exists });
    }
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
