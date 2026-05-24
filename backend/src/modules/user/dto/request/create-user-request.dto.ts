import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { PASSWORD_PATTERN } from '@/common/constants/regex.constant';
import { UserRole } from '@/modules/user/enum/general.enum';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@email.com',
    format: 'email',
  })
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
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
  password: string;

  @ApiProperty({
    description: 'Role assigned to the user',
    enum: UserRole,
    example: UserRole.HALL_ADMIN,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'Hall ID for hall-scoped users',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  hallId?: number;
}
