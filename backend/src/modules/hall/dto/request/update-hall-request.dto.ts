import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateHallRequestDto {
  @ApiProperty({ description: 'Name of the hall', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({ description: 'Description of the hall', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Physical address', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Contact email', required: false })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  email?: string;

  @ApiProperty({ description: 'Contact phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
