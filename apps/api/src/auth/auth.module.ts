import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { DeviceModule } from "@/device/device.module";
import { UserModule } from "@/user/user.module";

import { JwtAuthStrategy } from "./strategies/jwt-auth.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule, DeviceModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
