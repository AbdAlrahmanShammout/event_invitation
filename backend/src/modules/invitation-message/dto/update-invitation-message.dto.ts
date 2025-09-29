import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateInvitationMessageDto {
  @ApiProperty({
    description: 'The updated content of the message',
    example: 'Please join us for our special day!',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}
