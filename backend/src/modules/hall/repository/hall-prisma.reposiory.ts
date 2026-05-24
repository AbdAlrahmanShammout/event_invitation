import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { HallMapper } from '@/modules/hall/mapper/hall.mapper';
import { HallRepository } from '@/modules/hall/repository/hall.repository';
import { hallDetailsInclude } from '@/modules/hall/types/hall-details.include';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

import {
  CreateHallRepoInput,
  GetHallsRepoInput,
  UpdateHallRepoInput,
} from '../defs/hall-repository.defs';
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
      where: { id },
      include: hallDetailsInclude,
    });
    if (!result) return null;
    return HallMapper.toEntity(result);
  }

  async findAll(input: GetHallsRepoInput): Promise<HallEntity[]> {
    const where: Prisma.HallWhereInput = {};
    if (input.status) {
      where.status = input.status;
    }
    const results = await this.prismaService.hall.findMany({
      where,
      include: hallDetailsInclude,
      take: input.limit ?? 20,
      skip: input.offset ?? 0,
      orderBy: { createdAt: 'desc' },
    });
    return results.map((r) => HallMapper.toEntity(r));
  }

  async update(input: UpdateHallRepoInput): Promise<HallEntity> {
    const data: Prisma.HallUncheckedUpdateInput = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.description !== undefined) data.description = input.description;
    if (input.address !== undefined) data.address = input.address;
    if (input.email !== undefined) data.email = input.email;
    if (input.phone !== undefined) data.phone = input.phone;
    const result = await this.prismaService.hall.update({
      where: { id: input.id },
      data,
      include: hallDetailsInclude,
    });
    return HallMapper.toEntity(result);
  }
}
