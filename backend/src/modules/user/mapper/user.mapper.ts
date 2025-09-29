import { User } from '@prisma/client';

import { UserEntity } from '@/modules/user/entity/user.entity';

// User mapper for converting Prisma User to UserEntity

export class UserMapper {
  static toEntity(schema: User): UserEntity {
    return new UserEntity({
      id: schema.id,
      name: schema.name,
      hallId: schema.hallId,
      email: schema.email,
      role: schema.role,
      lastLoginAt: schema.lastLoginAt,
      passwordHash: schema.passwordHash,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    });
  }
}
