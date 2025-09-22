import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInvitationRequestDto {
  @ApiProperty({
    description: 'Title of the invitation',
    example: 'Wedding Celebration',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Optional description of the invitation',
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
  })
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  eventDate: Date;
}
