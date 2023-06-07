import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const user = req.user as any;
  return data ? user?.[data] : user;
});
