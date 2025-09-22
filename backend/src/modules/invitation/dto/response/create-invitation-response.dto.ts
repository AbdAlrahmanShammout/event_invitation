import { ApiProperty } from '@nestjs/swagger';

import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationResponse } from '@/modules/invitation/dto/response/model/invitation.response';

export class CreateInvitationResponseDto {
  @ApiProperty({
    description: 'Created invitation information',
    type: () => InvitationResponse,
  })
  invitation: InvitationResponse;

  constructor(invitation: InvitationEntity) {
    this.invitation = new InvitationResponse(invitation);
  }
}
