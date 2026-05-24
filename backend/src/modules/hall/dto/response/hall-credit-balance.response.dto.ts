import { ApiProperty } from '@nestjs/swagger';

import { HallCreditBalanceEntity } from '@/modules/hall/entity/hall-credit-balance.entity';

export class HallCreditBalanceResponseDto {
  @ApiProperty({ example: 5000 })
  availableCredits: number;

  @ApiProperty({ example: 200 })
  reservedCredits: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  constructor(entity: HallCreditBalanceEntity) {
    this.availableCredits = entity.availableCredits;
    this.reservedCredits = entity.reservedCredits;
    this.updatedAt = entity.updatedAt;
  }
}
