import { SetMetadata } from '@nestjs/common';

import { UserRole } from '@/modules/user/enum/general.enum';

export const ROLES_KEY = 'roles';

/**
 * Declares which user roles can access a controller or route handler.
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
