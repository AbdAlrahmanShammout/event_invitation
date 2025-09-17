import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { BaseEntity } from '@/common/base/base.entity';
import { InvitationRecipientZodType } from '@/modules/invitation-recipient/zod/invitation-recipient.zod';

export class InvitationRecipientEntity extends BaseEntity {
  invitationId: number;
  invitationMessageId: number;
  recipientName: string;
  phoneNumber: string;
  messageStatus: MessageStatus;
  sendAt: Date;
  sentAt?: Date;

  constructor(props: InvitationRecipientZodType) {
    super();
    Object.assign(this, props);
  }
}
