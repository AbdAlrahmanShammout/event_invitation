import { ApiProperty } from '@nestjs/swagger';

import { BaseModelResponseDto } from '@/common/base/base-model.response';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationMessageResponse } from '@/modules/invitation-message/dto/response/model/invitation-message.response';
import { InvitationRecipientResponse } from '@/modules/invitation-recipient/dto/response/model/invitation-recipient.response';
import { UserResponse } from '@/modules/user/dto/response/model/user.response';

export class InvitationResponse extends BaseModelResponseDto {
  @ApiProperty({
    description: 'Title of the invitation',
    example: 'Wedding Celebration',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the invitation',
    example: 'Join us for a beautiful wedding celebration',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Event date',
    example: '2024-12-25T18:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  eventDate: Date;

  @ApiProperty({
    description: 'ID of the hall where the event will take place',
    example: 1,
  })
  hallId: number;

  @ApiProperty({
    description: 'ID of the user who created the invitation',
    example: 1,
  })
  creatorId: number;

  @ApiProperty({
    description: 'Creator information',
    type: () => UserResponse,
    required: false,
  })
  creator?: UserResponse;

  @ApiProperty({
    description: 'List of invitation messages',
    type: () => [InvitationMessageResponse],
    required: false,
  })
  messages?: InvitationMessageResponse[];

  @ApiProperty({
    description: 'List of invitation recipients',
    type: () => [InvitationRecipientResponse],
    required: false,
  })
  recipients?: InvitationRecipientResponse[];

  constructor(data: InvitationEntity) {
    super(data);
    this.title = data.title;
    this.description = data.description;
    this.eventDate = data.eventDate;
    this.hallId = data.hallId;
    this.creatorId = data.creatorId;

    this.creator = data.creator ? new UserResponse(data.creator) : undefined;
    this.messages = data.messages
      ? data.messages.map((message) => new InvitationMessageResponse(message))
      : undefined;
    this.recipients = data.recipients
      ? data.recipients.map((recipient) => new InvitationRecipientResponse(recipient))
      : undefined;
  }
}
