import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserType } from '@/modules/user/types/user-details-schema.type';

// User mapper for converting Prisma User to UserEntity

export class UserMapper {
  static toEntity(schema: UserType): UserEntity {
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
