import { ApiProperty } from '@nestjs/swagger';

import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationResponse } from '@/modules/invitation/dto/response/model/invitation.response';

export class GetInvitationsResponseDto {
  @ApiProperty({
    description: 'List of invitations',
    type: () => [InvitationResponse],
  })
  invitations: InvitationResponse[];

  @ApiProperty({
    description: 'Total count of invitations',
    example: 25,
  })
  total: number;

  constructor(invitations: InvitationEntity[], total?: number) {
    this.invitations = invitations.map((invitation) => new InvitationResponse(invitation));
    this.total = total || invitations.length;
  }
}
