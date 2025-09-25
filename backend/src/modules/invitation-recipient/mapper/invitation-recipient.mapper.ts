import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { InvitationRecipientFullType } from '@/providers/database/prisma/schema-prisma.type';

export class InvitationRecipientMapper {
  static toEntity(schema: InvitationRecipientFullType): InvitationRecipientEntity {
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
