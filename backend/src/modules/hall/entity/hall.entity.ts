import { HallStatus } from '@/modules/hall/enum/general.enum';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { BaseEntity } from '@/common/base/base.entity';

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
  users?: UserEntity[];
  invitations?: InvitationEntity[];

  // constructor(props: Partial<HallEntity>) {
  //   Object.assign(this, props);
  // }
}
