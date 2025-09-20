import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { trimAndRemoveExtraWhiteSpaces } from '@/common/helpers/string.helper';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => trimAndRemoveExtraWhiteSpaces(value).toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @ApiProperty({
    required: true,
    example: 'Strong password?',
  })
  password: string;
}
