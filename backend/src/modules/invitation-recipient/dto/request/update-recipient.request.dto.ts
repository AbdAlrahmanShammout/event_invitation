import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPhoneNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRecipientRequestDto {
  @ApiProperty({
    description: 'Name of the recipient',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Phone number of the recipient',
    example: '+1234567890',
    required: false,
  })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Notes about the recipient',
    example: 'VIP guest',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'When the message was sent',
    type: Date,
    example: '2025-09-25T10:00:00Z',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  sentAt?: Date;
}