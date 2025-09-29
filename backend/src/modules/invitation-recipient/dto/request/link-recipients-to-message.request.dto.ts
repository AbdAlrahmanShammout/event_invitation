import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ArrayMinSize } from 'class-validator';

export class LinkRecipientsToMessageRequestDto {
  @ApiProperty({
    description: 'The ID of the message to link recipients to',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  messageId: number;

  @ApiProperty({
    description: 'Array of recipient IDs to link to the message',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one recipient ID must be provided' })
  @IsNumber({}, { each: true, message: 'Each recipient ID must be a number' })
  @Type(() => Number)
  recipientIds: number[];
}
