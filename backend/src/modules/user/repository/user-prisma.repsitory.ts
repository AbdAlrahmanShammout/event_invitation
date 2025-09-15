import { UserRepository } from '@/modules/user/repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';
import { CreateUserRepoInput } from '@/modules/user/defs/user-repository.defs';
import { UserMapper } from '@/modules/user/mapper/user.mapper';
import { Injectable } from '@nestjs/common';

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
}
