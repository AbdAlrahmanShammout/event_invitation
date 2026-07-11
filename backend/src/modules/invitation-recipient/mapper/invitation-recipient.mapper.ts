import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { InvitationRecipientType } from '@/modules/invitation-recipient/types/invitation-recipient-details-schema.type';

export class InvitationRecipientMapper {
  static toEntity(schema: InvitationRecipientType): InvitationRecipientEntity {
    return new InvitationRecipientEntity({
      id: schema.id,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      invitationId: schema.invitationId,
      invitationMessageId: schema.invitationMessageId || undefined,
      recipientName: schema.recipientName,
      phoneNumber: schema.phoneNumber,
      messageStatus: schema.messageStatus,
      sendAt: schema.sendAt || undefined,
      sentAt: schema.sentAt || undefined,
      submittedAt: schema.submittedAt || undefined,
      notes: schema.notes || undefined,
    });
  }
}
