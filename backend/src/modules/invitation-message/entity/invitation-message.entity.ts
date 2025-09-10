import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { BaseEntity } from '@/common/base/base.entity';

export class InvitationMessageEntity extends BaseEntity {
  content: string;
  invitationId: bigint;

  invitation?: InvitationEntity;
  recipients?: InvitationRecipientEntity[];

  // constructor(props: Partial<InvitationMessageEntity>) {
  //   Object.assign(this, props);
  // }
}
