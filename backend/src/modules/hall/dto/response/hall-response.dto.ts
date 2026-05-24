import { ApiProperty } from '@nestjs/swagger';

import { HallRespnse } from '@/modules/hall/dto/response/model/hall.respnse';
import { HallEntity } from '@/modules/hall/entity/hall.entity';

export class HallResponseDto {
  @ApiProperty({ type: () => HallRespnse })
  hall: HallRespnse;

  constructor(hall: HallEntity) {
    this.hall = new HallRespnse(hall);
  }
}
