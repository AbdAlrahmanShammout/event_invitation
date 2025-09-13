import { BaseEntity } from '@/common/base/base.entity';
import { UserZodType } from '@/modules/user/zod/user.zod';
import { UserRole } from '@/modules/user/enum/general.enum';

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  hallId?: bigint;
  role: UserRole;
  lastLoginAt?: Date;

  constructor(data: UserZodType) {
    super();
    Object.assign(this, data);
  }
}
