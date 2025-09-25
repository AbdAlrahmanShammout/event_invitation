import { ApiProperty } from '@nestjs/swagger';

import { BaseModelResponseDto } from '@/common/base/base-model.response';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';

export class InvitationRecipientResponse extends BaseModelResponseDto {
  @ApiProperty({
    description: 'ID of the invitation this recipient belongs to',
    example: 1,
  })
  invitationId: number;

  @ApiProperty({
    description: 'ID of the invitation message sent to this recipient',
    example: 1,
    required: false,
  })
  invitationMessageId?: number;

  @ApiProperty({
    description: 'Name of the recipient',
    example: 'John Doe',
  })
  recipientName: string;

  @ApiProperty({
    description: 'Phone number of the recipient',
    example: '+1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Status of the message',
    enum: MessageStatus,
    example: MessageStatus.PENDING,
  })
  messageStatus: MessageStatus;

  @ApiProperty({
    description: 'Scheduled time to send the message',
    example: '2024-12-25T10:00:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  sendAt?: Date;

  @ApiProperty({
    description: 'Actual time the message was sent',
    example: '2024-12-25T10:05:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  sentAt?: Date;

  @ApiProperty({
    description: 'Time when submitted via mobile app',
    example: '2024-12-20T15:30:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  submittedAt?: Date;

  @ApiProperty({
    description: 'Notes from mobile submission',
    example: 'Close friend from university',
    required: false,
  })
  notes?: string;

  constructor(data: InvitationRecipientEntity) {
    super(data);
    this.invitationId = data.invitationId;
    this.invitationMessageId = data.invitationMessageId;
    this.recipientName = data.recipientName;
    this.phoneNumber = data.phoneNumber;
    this.messageStatus = data.messageStatus;
    this.sendAt = data.sendAt;
    this.sentAt = data.sentAt;
    this.submittedAt = data.submittedAt;
    this.notes = data.notes;
  }
}
