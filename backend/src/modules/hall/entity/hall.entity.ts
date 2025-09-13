import { HallStatus } from '@/modules/hall/enum/general.enum';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { BaseEntity } from '@/common/base/base.entity';
import { HallZodType } from '@/modules/hall/zod/hall.zod';

export class HallEntity extends BaseEntity {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  status: HallStatus;
  ownerId: bigint;
  balance: bigint;

  owner?: UserEntity;
  employees?: UserEntity[];
  invitations?: InvitationEntity[];

  constructor(data: HallZodType) {
    super();
    Object.assign(this, data);
  }
}
