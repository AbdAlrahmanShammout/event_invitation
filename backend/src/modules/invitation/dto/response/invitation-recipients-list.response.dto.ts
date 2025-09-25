import { ApiProperty } from '@nestjs/swagger';
import { InvitationRecipientResponse } from '@/modules/invitation-recipient/dto/response/model/invitation-recipient.response';

export class InvitationRecipientsListResponseDto {
  @ApiProperty({
    description: 'List of recipients for the invitation',
    type: [InvitationRecipientResponse],
  })
  recipients: InvitationRecipientResponse[];

  @ApiProperty({
    description: 'Total number of recipients',
    type: Number,
    example: 5,
  })
  total: number;
}
