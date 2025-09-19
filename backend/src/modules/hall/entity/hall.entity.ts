import { BaseEntity } from '@/common/base/base.entity';
import { HallStatus } from '@/modules/hall/enum/general.enum';
import { HallZodType } from '@/modules/hall/zod/hall.zod';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { UserEntity } from '@/modules/user/entity/user.entity';

export class HallEntity extends BaseEntity {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  status: HallStatus;
  ownerId: number;
  balance: number;

  owner?: UserEntity;
  employees?: UserEntity[];
  invitations?: InvitationEntity[];

  constructor(data: HallZodType) {
    super();
    Object.assign(this, data);
  }
}
