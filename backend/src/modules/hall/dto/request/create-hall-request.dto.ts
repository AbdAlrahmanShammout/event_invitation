import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PASSWORD_PATTERN } from '@/common/constants/regex.constant';

export class CreateHallRequestDto {
  @ApiProperty({
    description: 'The name of the hall',
    example: 'Grand Ballroom',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  hallName: string;

  @ApiProperty({
    description: 'Optional description of the hall',
    example: 'A beautiful venue for weddings and events',
    required: false,
  })
  @IsOptional()
  @IsString()
  hallDescription?: string;

  @ApiProperty({
    description: 'Physical address of the hall',
    example: '123 Main St, City, State 12345',
  })
  @IsString()
  @IsNotEmpty()
  hallAddress: string;

  @ApiProperty({
    description: 'Contact email for the hall',
    example: 'contact@grandballroom.com',
    format: 'email',
  })
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  hallEmail: string;

  @ApiProperty({
    description: 'Contact phone number for the hall',
    example: '+1-555-123-4567',
  })
  @IsString()
  @IsNotEmpty()
  hallPhone: string;

  @ApiProperty({
    description: 'Full name of the hall owner',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @ApiProperty({
    description: 'Email address for the hall owner account',
    example: 'john.doe@email.com',
    format: 'email',
  })
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  ownerEmail: string;

  @ApiProperty({
    description:
      'Password for the hall owner account. Must be at least 8 characters long and meet security requirements.',
    example: 'SecurePass123!',
    minLength: 8,
    maxLength: 255,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @Matches(PASSWORD_PATTERN, {
    message: 'Weak password',
  })
  ownerPassword: string;
}
