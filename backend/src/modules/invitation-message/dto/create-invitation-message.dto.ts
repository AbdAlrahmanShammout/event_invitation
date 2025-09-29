import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateInvitationMessageDto {
  @ApiProperty({
    description: 'The message content to be sent to recipients',
    example: 'You are cordially invited to our wedding celebration...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}
