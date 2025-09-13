import { InvitationRecipientFullType } from '@/providers/database/prisma/schema-prisma.type';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';

export class InvitationRecipientMapper {
  static toEntity(schema: InvitationRecipientFullType): InvitationRecipientEntity {
    return new InvitationRecipientEntity({
      id: schema.id,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      invitationId: schema.invitationId,
      invitationMessageId: schema.invitationMessageId,
      recipientName: schema.recipientName,
      phoneNumber: schema.phoneNumber,
      messageStatus: schema.messageStatus,
      sendAt: schema.sendAt,
      sentAt: schema.sentAt,
    });
  }
}
