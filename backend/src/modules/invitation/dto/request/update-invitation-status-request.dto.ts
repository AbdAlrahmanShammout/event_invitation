import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { InvitationStatus } from '@/modules/invitation/enum/general.enum';

export class UpdateInvitationStatusRequestDto {
  @ApiProperty({
    description: 'New status for the invitation',
    enum: InvitationStatus,
    example: InvitationStatus.PENDING_APPROVAL,
  })
  @IsEnum(InvitationStatus)
  @IsNotEmpty()
  status: InvitationStatus;
}
