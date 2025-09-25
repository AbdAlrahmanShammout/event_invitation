import { ApiProperty } from '@nestjs/swagger';

import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { HallRespnse } from '@/modules/hall/dto/response/model/hall.respnse';
import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { InvitationResponse } from '@/modules/invitation/dto/response/model/invitation.response';

export class InvitationDetailsResponseDto {
  @ApiProperty({
    type: () => InvitationResponse,
  })
  invitation: InvitationResponse;

  @ApiProperty({
    type: () => HallRespnse,
  })
  hall: HallRespnse;

  @ApiProperty({
    description: 'Number of guests already submitted via mobile',
    example: 25,
  })
  submittedGuestsCount: number;

  constructor(data: {
    invitation: InvitationEntity;
    hall: HallEntity;
    submittedGuestsCount: number;
  }) {
    this.invitation = new InvitationResponse(data.invitation);
    this.hall = new HallRespnse(data.hall);
    this.submittedGuestsCount = data.submittedGuestsCount;
  }
}
