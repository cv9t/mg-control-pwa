import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { env } from "@/config";
import { DeviceService } from "@/device/device.service";
import { UserService } from "@/user/user.service";

import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { hashData, verifyHashedData } from "./helpers/crypto.helpers";
import { JwtPayload } from "./interfaces/jwt-payload";

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly deviceService: DeviceService,
    private readonly jwtService: JwtService,
    private readonly config: env.Config
  ) {}

  public async register(registerDto: RegisterDto) {
    const device = await this.deviceService.findByActivateCode(registerDto.activateCode);
    if (!device) {
      throw new BadRequestException("Activate code is not valid");
    }
    if (device.isActivated) {
      throw new BadRequestException("Device already activated");
    }

    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const user = await this.userService.create({
      device: device.id,
      email: registerDto.email,
      password: hashData(registerDto.password),
      refresh_token: null,
    });

    const tokens = await this.getTokens({ deviceId: user.device, sub: user.id });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this.deviceService.update(device.id, { isActivated: true });
    return tokens;
  }

  public async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException("User does not exist");
    }
    if (!verifyHashedData(loginDto.password, user.password)) {
      throw new BadRequestException("Password is incorrect");
    }

    const tokens = await this.getTokens({ deviceId: user.device, sub: user.id });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  public async logout(userId: string) {
    return this.userService.update(userId, { refresh_token: null });
  }

  public async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException();
    }
    if (!verifyHashedData(refreshToken, user.refresh_token)) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens({ deviceId: user.device, sub: user.id });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = hashData(refreshToken);
    await this.userService.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  private async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.jwt.access_secret,
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.jwt.refresh_secret,
        expiresIn: "7d",
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
