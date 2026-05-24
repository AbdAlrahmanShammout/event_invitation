import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class RechargeHallRequestDto {
  @ApiProperty({ description: 'Number of credits to add', example: 1000 })
  @IsInt()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: 'Optional reference note such as invoice number',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reference?: string;
}
