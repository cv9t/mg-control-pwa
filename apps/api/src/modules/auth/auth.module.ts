import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DeviceModule } from '@mg-control/api/modules/device/device.module';
import { TokenModule } from '@mg-control/api/modules/token/token.module';
import { UserModule } from '@mg-control/api/modules/user/user.module';

import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), UserModule, DeviceModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
