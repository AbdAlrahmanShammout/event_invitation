import { ApiProperty } from '@nestjs/swagger';

import { BaseModelResponseDto } from '@/common/base/base-model.response';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';

export class InvitationMessageResponse extends BaseModelResponseDto {
  @ApiProperty({
    description: 'Content of the invitation message',
    example: 'You are cordially invited to our wedding celebration...',
  })
  content: string;

  @ApiProperty({
    description: 'ID of the invitation this message belongs to',
    example: 1,
  })
  invitationId: number;

  constructor(data: InvitationMessageEntity) {
    super(data);
    this.content = data.content;
    this.invitationId = data.invitationId;
  }
}
