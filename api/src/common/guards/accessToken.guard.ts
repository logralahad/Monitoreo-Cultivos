import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { IS_REFRESH_KEY } from '../decorators/refresh.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard('JWT') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isToken = this.reflector.getAllAndOverride<boolean>(IS_REFRESH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic || isToken) {
      return true;
    }

    return super.canActivate(context);
  }
}
