import { InvitationMessageFullType } from '@/providers/database/prisma/schema-prisma.type';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationRecipientMapper } from '@/modules/invitation-recipient/mapper/invitation-recipient.mapper';

export class InvitationMessageMapper {
  static toEntity(schema: InvitationMessageFullType): InvitationMessageEntity {
    return new InvitationMessageEntity({
      id: schema.id,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      content: schema.content,
      invitationId: schema.invitationId,

      recipients: schema.recipients
        ? schema.recipients.map((e) => InvitationRecipientMapper.toEntity(e))
        : null,
    });
  }
}
