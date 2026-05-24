import { ApiProperty } from '@nestjs/swagger';

import { HallCreditTransactionEntity } from '@/modules/hall/entity/hall-credit-transaction.entity';
import { HallCreditTransactionType } from '@/modules/hall/enum/general.enum';

export class HallCreditTransactionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: HallCreditTransactionType })
  type: HallCreditTransactionType;

  @ApiProperty({ example: 1000 })
  amount: number;

  @ApiProperty({ example: 5000 })
  balanceAfter: number;

  @ApiProperty({ required: false })
  reference?: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  constructor(entity: HallCreditTransactionEntity) {
    this.id = entity.id;
    this.type = entity.type;
    this.amount = entity.amount;
    this.balanceAfter = entity.balanceAfter;
    this.reference = entity.reference;
    this.createdAt = entity.createdAt;
  }
}
