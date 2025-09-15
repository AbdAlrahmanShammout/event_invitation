import { ApiProperty } from '@nestjs/swagger';
import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { HallRespnse } from '@/modules/hall/dto/response/model/hall.respnse';

export class CreateHallResponseDto {
  @ApiProperty({
    description: 'Created hall information',
    type: () => HallRespnse
  })
  hall: HallRespnse;

  constructor(hall: HallEntity) {
    this.hall = new HallRespnse(hall);
  }
}
