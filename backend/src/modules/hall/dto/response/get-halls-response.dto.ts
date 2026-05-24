import { ApiProperty } from '@nestjs/swagger';

import { HallRespnse } from '@/modules/hall/dto/response/model/hall.respnse';
import { HallEntity } from '@/modules/hall/entity/hall.entity';

export class GetHallsResponseDto {
  @ApiProperty({ type: () => [HallRespnse] })
  halls: HallRespnse[];

  @ApiProperty({ example: 10 })
  total: number;

  constructor(halls: HallEntity[], total?: number) {
    this.halls = halls.map((h) => new HallRespnse(h));
    this.total = total ?? halls.length;
  }
}
