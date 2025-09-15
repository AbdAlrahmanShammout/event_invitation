import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PASSWORD_PATTERN } from '@/common/constants/regex.constant';

export class CreateHallRequestDto {
  @IsString()
  @IsNotEmpty()
  hallName: string;

  @IsOptional()
  @IsString()
  hallDescription?: string;

  @IsString()
  @IsNotEmpty()
  hallAddress: string;

  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  hallEmail: string;

  @IsString()
  @IsNotEmpty()
  hallPhone: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  ownerEmail: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @Matches(PASSWORD_PATTERN, {
    message: 'Weak password',
  })
  ownerPassword: string;
}
