import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { BaseEntity } from '@/common/base/base.entity';

export class InvitationRecipientEntity extends BaseEntity {
  invitationId: bigint;
  invitationMessageId: bigint;
  recipientName: string;
  phoneNumber: string;
  messageStatus: MessageStatus;
  sendAt: Date;
  sentAt?: Date;

  invitation?: InvitationEntity;
  invitationMessage?: InvitationMessageEntity;

  // constructor(props: Partial<InvitationRecipientEntity>) {
  //   Object.assign(this, props);
  // }
}
