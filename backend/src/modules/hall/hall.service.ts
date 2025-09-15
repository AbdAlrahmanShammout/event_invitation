import { Injectable } from '@nestjs/common';
import { HallRepository } from '@/modules/hall/repository/hall.repository';
import { CreateHallServiceInput } from '@/modules/hall/defs/hall-service.defs';

@Injectable()
export class HallService {
  constructor(private readonly hallRepository: HallRepository) {}

  async createHall(input: CreateHallServiceInput) {
    return await this.hallRepository.create({
      ...input,
    });
  }
}
