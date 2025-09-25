import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { MobileTokenService } from '@/modules/mobile/services/mobile-token.service';
import { MobileTokenPayload } from '@/modules/mobile/types/mobile-token-payload.type';

export const MOBILE_PERMISSION_KEY = 'mobile_permission';

@Injectable()
export class MobileAuthGuard implements CanActivate {
  constructor(
    private readonly mobileTokenService: MobileTokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Get token from header
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Mobile access token is required');
    }

    // Validate token
    const payload = await this.mobileTokenService.validateInvitationAccessToken(token);

    // Check required permission if specified
    const requiredPermission = this.reflector.get<string>(
      MOBILE_PERMISSION_KEY,
      context.getHandler(),
    );

    if (requiredPermission && !this.mobileTokenService.hasPermission(payload, requiredPermission)) {
      throw new UnauthorizedException(`Permission '${requiredPermission}' is required`);
    }

    // Attach payload to request for use in controllers
    (request as any).mobileAuth = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['x-invitation-token'] as string;
    return authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  }
}

// Decorator to specify required permission
export const RequireMobilePermission = (permission: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflector.createDecorator<string>({ key: MOBILE_PERMISSION_KEY })(permission)(
      target,
      propertyKey,
      descriptor,
    );
  };
};
