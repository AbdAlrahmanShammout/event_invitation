import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationMessageMapper } from '@/modules/invitation-message/mapper/invitation-message.mapper';
import { InvitationRecipientMapper } from '@/modules/invitation-recipient/mapper/invitation-recipient.mapper';
import { UserMapper } from '@/modules/user/mapper/user.mapper';
import { InvitationFullType } from '@/providers/database/prisma/schema-prisma.type';

export class InvitationMapper {
  static toEntity(schema: InvitationFullType): InvitationEntity {
    return new InvitationEntity({
      id: schema.id,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      title: schema.title,
      description: schema.description,
      eventDate: schema.eventDate,
      hallId: schema.hallId,
      creatorId: schema.creatorId,
      creator: schema.creator ? UserMapper.toEntity(schema.creator) : null,
      messages: schema.messages
        ? schema.messages.map((e) => InvitationMessageMapper.toEntity(e))
        : null,
      recipients: schema.recipients
        ? schema.recipients.map((e) => InvitationRecipientMapper.toEntity(e))
        : null,
    });
  }
}
