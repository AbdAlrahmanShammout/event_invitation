import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateHallServiceInput,
  CreateHallWithOwnerServiceInput,
} from '@/modules/hall/defs/hall-service.defs';
import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { HallStatus } from '@/modules/hall/enum/general.enum';
import { HallRepository } from '@/modules/hall/repository/hall.repository';
import { UserRole } from '@/modules/user/enum/general.enum';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class HallService {
  constructor(
    private readonly hallRepository: HallRepository,
    private readonly userService: UserService,
  ) {}

  async createHall(input: CreateHallServiceInput): Promise<HallEntity> {
    return await this.hallRepository.create({
      ...input,
    });
  }

  async createHallWithOwner(input: CreateHallWithOwnerServiceInput): Promise<HallEntity> {
    const user = await this.userService.createUser({
      name: input.ownerName,
      email: input.ownerEmail,
      password: input.ownerPassword,
      role: UserRole.HALL_ADMIN,
    });
    const hall = await this.createHall({
      name: input.hallName,
      description: input.hallDescription,
      address: input.hallAddress,
      email: input.hallEmail,
      phone: input.hallPhone,
      ownerId: user.id,
    });
    await this.userService.updateHallId({
      id: user.id,
      hallId: hall.id,
    });
    return hall;
  }

  async findHallById(id: number): Promise<HallEntity | null> {
    return await this.hallRepository.findById(id);
  }

  async getHallById(id: number): Promise<HallEntity> {
    const hall = await this.findHallById(id);
    if (!hall) throw new NotFoundException(`Hall with ID ${id} not found`);
    return hall;
  }

  async getHalls(input: { status?: HallStatus; limit?: number; offset?: number } = {}): Promise<HallEntity[]> {
    return this.hallRepository.findAll({
      status: input.status,
      limit: input.limit,
      offset: input.offset,
    });
  }

  async updateHallProfile(input: {
    id: number;
    name?: string;
    description?: string;
    address?: string;
    email?: string;
    phone?: string;
  }): Promise<HallEntity> {
    await this.getHallById(input.id);
    return this.hallRepository.update(input);
  }
}
