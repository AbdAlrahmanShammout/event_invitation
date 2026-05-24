import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetPhoneNumbersRequestDto {
  @ApiProperty({ description: 'Filter by hall ID', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  hallId?: number;

  @ApiProperty({ description: 'Search phone number substring', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: 50, required: false })
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
