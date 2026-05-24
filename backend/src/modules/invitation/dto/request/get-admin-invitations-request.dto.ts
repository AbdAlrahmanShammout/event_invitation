import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

import { GetInvitationsRequestDto } from '@/modules/invitation/dto/request/get-invitations-request.dto';

export class GetAdminInvitationsRequestDto extends GetInvitationsRequestDto {
  @ApiProperty({
    description: 'Filter by hall ID. Omit it to list invitations across all halls.',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  hallId?: number;
}
