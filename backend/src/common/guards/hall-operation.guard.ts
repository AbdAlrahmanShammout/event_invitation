import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { getUserFromRequestUseContext } from '@/common/helpers';
import { HallAccountService } from '@/modules/hall/hall-account.service';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserRole } from '@/modules/user/enum/general.enum';

/**
 * Prevents hall-scoped users from performing operations when their hall
 * account is suspended or frozen.
 * Passes through for super admins and unauthenticated requests (let other
 * guards handle those cases).
 */
@Injectable()
export class HallOperationGuard implements CanActivate {
  constructor(private readonly hallAccountService: HallAccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = getUserFromRequestUseContext(context) as UserEntity | undefined;
    if (!user || user.role === UserRole.SUPER_ADMIN || !user.hallId) {
      return true;
    }
    await this.hallAccountService.assertHallCanOperate(user.hallId);
    return true;
  }
}
