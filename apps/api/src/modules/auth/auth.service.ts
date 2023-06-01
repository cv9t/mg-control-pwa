import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { DeleteResult } from "@/common/types";
import { env } from "@/config";
import { DeviceService } from "@/modules/device/device.service";
import { TokenService } from "@/modules/token/token.service";
import { UserService } from "@/modules/user/user.service";

import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { hashData, verifyHashedData } from "./helpers/crypto.helpers";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { GeneratedTokens } from "./auth.types";

@Injectable()
export class AuthService {
  public constructor(
    private readonly config: env.Config,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly deviceService: DeviceService,
    private readonly tokenService: TokenService
  ) {}

  public async register(registerDto: RegisterDto): Promise<GeneratedTokens> {
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
      device: device._id,
      email: registerDto.email,
      password: hashData(registerDto.password),
    });
    await this.deviceService.update(device.id, { isActivated: true });

    const tokens = await this.generateTokens({ deviceId: device.id, sub: user.id });
    await this.tokenService.save({ user: user._id, refreshToken: tokens.refreshToken });
    return tokens;
  }

  public async login(loginDto: LoginDto): Promise<GeneratedTokens> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException("User does not exist");
    }

    const passwordMatches = verifyHashedData(loginDto.password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException("Password is incorrect");
    }

    const tokens = await this.generateTokens({ deviceId: user.device.toString(), sub: user.id });
    await this.tokenService.save({ user: user._id, refreshToken: tokens.refreshToken });
    return tokens;
  }

  public async logout(refreshToken: string): Promise<DeleteResult> {
    return this.tokenService.remove(refreshToken);
  }

  public async refreshTokens(userId: string, refreshToken: string): Promise<GeneratedTokens> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new ForbiddenException("Access Denied");
    }

    const existingRefreshToken = await this.tokenService.findByRefreshToken(refreshToken);
    if (!existingRefreshToken) {
      throw new ForbiddenException("Access Denied");
    }

    const tokens = await this.generateTokens({ deviceId: user.device.toString(), sub: user.id });
    await this.tokenService.save({ user: user._id, refreshToken: tokens.refreshToken });
    return tokens;
  }

  private async generateTokens(payload: JwtPayload): Promise<GeneratedTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.config.jwt.access_secret,
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.config.jwt.refresh_secret,
          expiresIn: "7d",
        }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
