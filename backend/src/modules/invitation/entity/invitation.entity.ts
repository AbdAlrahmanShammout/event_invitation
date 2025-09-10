import { UserEntity } from '@/modules/user/entity/user.entity';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { BaseEntity } from '@/common/base/base.entity';

export class InvitationEntity extends BaseEntity {
  title: string;
  description: string;
  eventDate: Date;
  hallId: bigint;
  creatorId: bigint;

  creator?: UserEntity;
  messages?: InvitationMessageEntity[];
  recipients?: InvitationRecipientEntity[];

  // constructor(props: Partial<InvitationEntity>) {
  //   Object.assign(this, props);
  // }
}
