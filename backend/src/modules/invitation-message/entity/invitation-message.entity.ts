import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { BaseEntity } from '@/common/base/base.entity';
import { InvitationMessageZodType } from '@/modules/invitation-message/zod/invitation-message.zod';

export class InvitationMessageEntity extends BaseEntity {
  content: string;
  invitationId: number;

  recipients?: InvitationRecipientEntity[];

  constructor(props: InvitationMessageZodType) {
    super();
    Object.assign(this, props);
  }
}
