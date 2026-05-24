import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ChangeHallStatusRequestDto {
  @ApiProperty({
    description: 'Reason for the status change',
    example: 'Account suspended due to payment failure',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
