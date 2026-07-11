import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationStatus } from '@/modules/invitation/enum/general.enum';
import { InvitationMessageMapper } from '@/modules/invitation-message/mapper/invitation-message.mapper';
import { InvitationRecipientMapper } from '@/modules/invitation-recipient/mapper/invitation-recipient.mapper';
import { InvitationType } from '@/modules/invitation/types/invitation-details-schema.type';
import { UserMapper } from '@/modules/user/mapper/user.mapper';

export class InvitationMapper {
  static toEntity(schema: InvitationType): InvitationEntity {
    return new InvitationEntity({
      id: schema.id,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      title: schema.title,
      description: schema.description,
      eventDate: schema.eventDate,
      maxGuestsAllowed: schema.maxGuestsAllowed,
      hallId: schema.hallId,
      creatorId: schema.creatorId,
      status: schema.status as InvitationStatus,
      startSendAt: schema.startSendAt,
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
