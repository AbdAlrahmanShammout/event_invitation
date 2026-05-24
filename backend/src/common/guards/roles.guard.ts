import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '@/common/decorators/route/roles.decorator';
import { getUserFromRequestUseContext } from '@/common/helpers';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserRole } from '@/modules/user/enum/general.enum';

/**
 * Authorizes authenticated users by their assigned role.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    const user = getUserFromRequestUseContext(context) as UserEntity | undefined;
    if (!user || !allowedRoles.includes(user.role)) {
      throw new ForbiddenException('User role is not allowed to access this resource');
    }
    return true;
  }
}
