import { BaseEntity } from '@/common/base/base.entity';
import { UserRole } from '@/modules/user/enum/general.enum';
import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { UserZodType } from '@/modules/user/zod/user.zod';

export class UserEntity extends BaseEntity {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  lastLoginAt?: Date;

  ownedHalls?: HallEntity[];
  createdInvitations?: InvitationEntity[];

  // constructor(data: UserZodType) {
  //   Object.assign(this, data);
  // }
}
