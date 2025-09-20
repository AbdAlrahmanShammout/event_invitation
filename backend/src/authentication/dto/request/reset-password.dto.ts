import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { VerifyResetPasswordTokenDto } from '@/authentication/dto/request/verify-reset-password-token.dto';
import { PASSWORD_PATTERN } from '@/common/constants/regex.constant';

export class ResetPasswordDto extends PickType(VerifyResetPasswordTokenDto, ['token', 'userId']) {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @Matches(PASSWORD_PATTERN, {
    message: 'Weak password',
  })
  @ApiProperty({
    type: String,
    example: 'Strongpassword?',
  })
  password: string;
}
