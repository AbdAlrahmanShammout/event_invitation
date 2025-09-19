import { BaseEntity } from '@/common/base/base.entity';
import { HallZodType } from '@/modules/hall/zod/hall.zod';
import { InvitationZodType } from '@/modules/invitation/zod/invitation.zod';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { UserEntity } from '@/modules/user/entity/user.entity';

export class InvitationEntity extends BaseEntity {
  title: string;
  description: string;
  eventDate: Date;
  hallId: number;
  creatorId: number;

  creator?: UserEntity;
  messages?: InvitationMessageEntity[];
  recipients?: InvitationRecipientEntity[];

  constructor(data: InvitationZodType) {
    super();
    Object.assign(this, data);
  }
}
