import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@/common/base/base.entity';

export class BaseModelResponseDto {
  @ApiProperty({
    description: 'Unique identifier',
    example: '1234567890123456789',
    type: 'string'
  })
  id: bigint;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-12-01T10:00:00Z',
    type: 'string',
    format: 'date-time',
    required: false
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-12-01T10:00:00Z',
    type: 'string',
    format: 'date-time',
    required: false
  })
  updatedAt?: Date;

  constructor(entity: BaseEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
