import { ApiProperty } from '@nestjs/swagger';

export class AddRecipientsResponseDto {
  @ApiProperty({
    description: 'Number of recipients successfully submitted',
    example: 25,
  })
  submittedCount: number;

  @ApiProperty({
    description: 'Total number of recipients for this invitation',
    example: 45,
  })
  totalCount: number;

  @ApiProperty({
    description: 'Success message',
    example: 'Recipients submitted successfully and are pending hall approval',
  })
  message: string;

  @ApiProperty({
    description: 'Submission ID for tracking',
    example: 'sub_123456789',
  })
  submissionId: string;

  constructor(data: { submittedCount: number; totalCount: number; submissionId: string }) {
    this.submittedCount = data.submittedCount;
    this.totalCount = data.totalCount;
    this.submissionId = data.submissionId;
    this.message = 'Recipients submitted successfully and are pending hall approval';
  }
}
