import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MobileTokenPayload } from '@/modules/mobile/types/mobile-token-payload.type';

export const MobileAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): MobileTokenPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.mobileAuth;
  },
);
