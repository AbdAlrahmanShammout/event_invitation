import { Injectable } from '@nestjs/common';

import { CreateHallServiceInput } from '@/modules/hall/defs/hall-service.defs';
import { HallRepository } from '@/modules/hall/repository/hall.repository';

@Injectable()
export class HallService {
  constructor(private readonly hallRepository: HallRepository) {}

  async createHall(input: CreateHallServiceInput) {
    return await this.hallRepository.create({
      ...input,
    });
  }
}
