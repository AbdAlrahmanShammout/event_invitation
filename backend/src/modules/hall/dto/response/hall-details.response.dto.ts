import { HallRespnse } from '@/modules/hall/dto/response/model/hall.respnse';
import { HallEntity } from '@/modules/hall/entity/hall.entity';

export class HallDetailsResponseDto {
  whatsappSessionExists: boolean;

  whatsappIsReady: boolean;

  hall: HallRespnse;

  constructor(data: {
    whatsappSessionExists: boolean;
    whatsappIsReady: boolean;
    hall: HallEntity;
  }) {
    this.whatsappSessionExists = data.whatsappSessionExists;
    this.whatsappIsReady = data.whatsappIsReady;
    this.hall = new HallRespnse(data.hall);
  }
}
