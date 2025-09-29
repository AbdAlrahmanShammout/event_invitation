import { ApiProperty } from '@nestjs/swagger';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationMessageResponse } from './model/invitation-message.response';

export class InvitationMessagesListResponseDto {
  @ApiProperty({
    description: 'List of invitation messages',
    type: [InvitationMessageResponse],
  })
  messages: InvitationMessageResponse[];

  @ApiProperty({
    description: 'Total number of messages',
    example: 5,
  })
  total: number;

  constructor(data: { messages: InvitationMessageEntity[]; total: number }) {
    this.messages = data.messages.map((message) => new InvitationMessageResponse(message));
    this.total = data.total;
  }
}