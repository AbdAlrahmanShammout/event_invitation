import { BaseEntity } from '@/common/base/base.entity';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';
import { InvitationRecipientZodType } from '@/modules/invitation-recipient/zod/invitation-recipient.zod';

export class InvitationRecipientEntity extends BaseEntity {
  invitationId: number;
  invitationMessageId?: number;
  recipientName: string;
  phoneNumber: string;
  messageStatus: MessageStatus;
  sendAt?: Date;
  sentAt?: Date;
  submittedAt?: Date;
  notes?: string;

  constructor(props: InvitationRecipientZodType) {
    super();
    Object.assign(this, props);
  }
}
