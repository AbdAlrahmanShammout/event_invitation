import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateInvitationRequestDto {
  @ApiProperty({
    description: 'Title of the invitation',
    example: 'Wedding Celebration',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Description of the invitation',
    example: 'Join us for a beautiful wedding celebration',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Event date in ISO format',
    example: '2024-12-25T18:00:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  eventDate?: Date;

  @ApiProperty({
    description: 'Start sending date/time for all messages',
    example: '2024-12-24T10:00:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  startSendAt?: Date;
}
