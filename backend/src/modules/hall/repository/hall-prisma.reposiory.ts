import { Injectable } from '@nestjs/common';

import { HallMapper } from '@/modules/hall/mapper/hall.mapper';
import { HallRepository } from '@/modules/hall/repository/hall.repository';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

import { CreateHallRepoInput } from '../defs/hall-repository.defs';
import { HallEntity } from '../entity/hall.entity';

@Injectable()
export class HallPrismaReposiory implements HallRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateHallRepoInput): Promise<HallEntity> {
    const result = await this.prismaService.hall.create({
      data: {
        name: input.name,
        description: input.description,
        address: input.address,
        email: input.email,
        phone: input.phone,
        ownerId: input.ownerId,
      },
    });

    return HallMapper.toEntity(result);
  }

  async findById(id: number): Promise<HallEntity | null> {
    const result = await this.prismaService.hall.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return null;
    }

    return HallMapper.toEntity(result);
  }
}
