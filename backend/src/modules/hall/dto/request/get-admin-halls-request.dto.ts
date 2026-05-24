import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { HallStatus } from '@/modules/hall/enum/general.enum';

export class GetAdminHallsRequestDto {
  @ApiProperty({
    description: 'Filter halls by status',
    enum: HallStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(HallStatus)
  status?: HallStatus;

  @ApiProperty({ description: 'Number of items to return', example: 20, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @ApiProperty({ description: 'Number of items to skip', example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  offset?: number;
}
