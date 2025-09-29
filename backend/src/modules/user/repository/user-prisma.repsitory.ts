import { Injectable } from '@nestjs/common';

import { CreateUserRepoInput, UpdatePasswordRepoInput, UpdateHallIdRepoInput } from '@/modules/user/defs/user-repository.defs';
import { UserMapper } from '@/modules/user/mapper/user.mapper';
import { UserRepository } from '@/modules/user/repository/user.repository';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserPrismaRepsitory implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateUserRepoInput): Promise<UserEntity> {
    const result = await this.prismaService.user.create({
      data: {
        name: input.name,
        hallId: input.hallId,
        email: input.email,
        role: input.role,
        passwordHash: input.passwordHash,
      },
    });

    return UserMapper.toEntity(result);
  }

  async findOneUserByEmailAndHashPassword(
    email: string,
    hashedPassword: string,
  ): Promise<UserEntity | null> {
    const result = await this.prismaService.user.findUnique({
      where: {
        email: email,
        passwordHash: hashedPassword,
      },
    });

    if (!result) return null;

    return UserMapper.toEntity(result);
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    const result = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) return null;

    return UserMapper.toEntity(result);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!result) return null;

    return UserMapper.toEntity(result);
  }

  async updatePassword(input: UpdatePasswordRepoInput): Promise<UserEntity> {
    const result = await this.prismaService.user.update({
      where: {
        id: input.id,
      },
      data: {
        passwordHash: input.passwordHash,
      },
    });

    return UserMapper.toEntity(result);
  }

  async updateHallId(input: UpdateHallIdRepoInput): Promise<UserEntity> {
    const result = await this.prismaService.user.update({
      where: {
        id: input.id,
      },
      data: {
        hallId: input.hallId,
      },
    });

    return UserMapper.toEntity(result);
  }
}
