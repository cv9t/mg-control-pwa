import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ERROR_TYPE } from '@mg-control/shared/types';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = (await super.canActivate(context)) as boolean;
      return result;
    } catch (error) {
      throw new UnauthorizedException({
        type: ERROR_TYPE.invalid_token,
      });
    }
  }
}
