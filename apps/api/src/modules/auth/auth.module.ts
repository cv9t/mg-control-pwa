import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DevicesModule } from '@mg-control/api/modules/devices/devices.module';
import { TokensModule } from '@mg-control/api/modules/tokens/tokens.module';
import { UsersModule } from '@mg-control/api/modules/users/users.module';

import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, JwtModule.register({}), UsersModule, DevicesModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
