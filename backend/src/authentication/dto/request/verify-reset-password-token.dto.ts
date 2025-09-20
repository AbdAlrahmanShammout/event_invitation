import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength, IsNumber } from 'class-validator';

export class VerifyResetPasswordTokenDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(400)
  @ApiProperty({ type: String })
  token: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  userId: number;
}
