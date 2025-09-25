import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MobileRecipientDto {
  @ApiProperty({
    description: 'Name of the guest',
    example: 'Ahmed Mohamed',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Phone number of the guest (international format)',
    example: '+201234567890',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'Optional notes about this guest',
    example: 'Close friend from university',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddRecipientsRequestDto {
  @ApiProperty({
    description: 'List of guests to invite',
    type: [MobileRecipientDto],
    example: [
      {
        name: 'Ahmed Mohamed',
        phoneNumber: '+201234567890',
        notes: 'Close friend',
      },
      {
        name: 'Fatima Ali',
        phoneNumber: '+201234567891',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100) // Prevent abuse
  @ValidateNested({ each: true })
  @Type(() => MobileRecipientDto)
  recipients: MobileRecipientDto[];
}
