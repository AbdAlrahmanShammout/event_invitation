import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { InvitationStatus } from '@/modules/invitation/enum/general.enum';

export class GetInvitationsRequestDto {
  @ApiProperty({
    description: 'Filter by creator ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  creatorId?: number;

  @ApiProperty({
    description: 'Include creator information',
    example: true,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  includeCreator?: boolean;

  @ApiProperty({
    description: 'Include messages information',
    example: true,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  includeMessages?: boolean;

  @ApiProperty({
    description: 'Include recipients information',
    example: true,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  includeRecipients?: boolean;

  @ApiProperty({
    description: 'Number of items to return',
    example: 10,
    required: false,
    default: 20,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @ApiProperty({
    description: 'Number of items to skip',
    example: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  offset?: number;

  @ApiProperty({
    description: 'Filter by invitation status',
    enum: InvitationStatus,
    example: InvitationStatus.DRAFT,
    required: false,
  })
  @IsOptional()
  @IsEnum(InvitationStatus)
  status?: InvitationStatus;

  @ApiProperty({
    description: 'Filter by event date (from this date onwards)',
    example: '2024-12-25T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  eventDateFrom?: Date;

  @ApiProperty({
    description: 'Filter by event date (up to this date)',
    example: '2024-12-31T23:59:59.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  eventDateTo?: Date;
}
