import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationMessageType } from '@/modules/invitation-message/types/invitation-message-details-schema.type';
import { InvitationRecipientMapper } from '@/modules/invitation-recipient/mapper/invitation-recipient.mapper';

export class InvitationMessageMapper {
  static toEntity(schema: InvitationMessageType): InvitationMessageEntity {
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
