import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "@/user/user.service";
import { isPassValid } from "@/utils/password-utils";

@Injectable()
export class AuthService {
  public constructor(private userService: UserService, private jwtService: JwtService) {}

  public async signIn(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user || !isPassValid(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, deviceId: user.device };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
