import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { UserRole } from '@/modules/user/enum/general.enum';

export class GetUsersRequestDto {
  @ApiProperty({
    description: 'Filter users by hall ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  hallId?: number;

  @ApiProperty({
    description: 'Filter users by role',
    enum: UserRole,
    example: UserRole.HALL_ADMIN,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: 'Number of items to return',
    example: 20,
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
}
