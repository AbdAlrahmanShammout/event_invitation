import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { HallCreditTransactionType } from '@/modules/hall/enum/general.enum';

export class GetCreditTransactionsRequestDto {
  @ApiProperty({ enum: HallCreditTransactionType, required: false })
  @IsOptional()
  @IsEnum(HallCreditTransactionType)
  type?: HallCreditTransactionType;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  offset?: number;
}
