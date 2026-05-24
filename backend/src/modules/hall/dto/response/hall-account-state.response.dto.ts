import { ApiProperty } from '@nestjs/swagger';

import { HallAccountStateEntity } from '@/modules/hall/entity/hall-account-state.entity';
import { HallAccountStatus } from '@/modules/hall/enum/general.enum';

export class HallAccountStateResponseDto {
  @ApiProperty({ enum: HallAccountStatus })
  status: HallAccountStatus;

  @ApiProperty({ required: false })
  reason?: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  constructor(entity: HallAccountStateEntity) {
    this.status = entity.status;
    this.reason = entity.reason;
    this.updatedAt = entity.updatedAt;
  }
}
