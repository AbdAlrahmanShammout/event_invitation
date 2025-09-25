import { Injectable } from '@nestjs/common';

import { CreateHallServiceInput } from '@/modules/hall/defs/hall-service.defs';
import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { HallRepository } from '@/modules/hall/repository/hall.repository';

@Injectable()
export class HallService {
  constructor(private readonly hallRepository: HallRepository) {}

  async createHall(input: CreateHallServiceInput): Promise<HallEntity> {
    return await this.hallRepository.create({
      ...input,
    });
  }

  async findHallById(id: number): Promise<HallEntity | null> {
    return await this.hallRepository.findById(id);
  }
}
