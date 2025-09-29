import { ApiProperty } from '@nestjs/swagger';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationRecipientResponse } from '@/modules/invitation-recipient/dto/response/model/invitation-recipient.response';
import { BaseModelResponseDto } from '@/common/base/base-model.response';

export class InvitationMessageResponse extends BaseModelResponseDto {
  @ApiProperty({
    description: 'Message content',
    example: 'You are cordially invited to our wedding celebration...',
  })
  content: string;

  @ApiProperty({
    description: 'Invitation ID this message belongs to',
    example: 1,
  })
  invitationId: number;

  @ApiProperty({
    description: 'Recipients associated with this message',
    type: [InvitationRecipientResponse],
    required: false,
  })
  recipients?: InvitationRecipientResponse[];

  constructor(data: InvitationMessageEntity) {
    super(data);
    this.content = data.content;
    this.invitationId = data.invitationId;
    this.recipients = data.recipients?.map((r) => new InvitationRecipientResponse(r));
  }
}
