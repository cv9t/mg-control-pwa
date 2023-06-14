import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ERROR_TYPE } from '@mg-control/shared/typings';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = (await super.canActivate(context)) as boolean;
      return result;
    } catch {
      throw new UnauthorizedException({ type: ERROR_TYPE.invalid_token });
    }
  }
}
