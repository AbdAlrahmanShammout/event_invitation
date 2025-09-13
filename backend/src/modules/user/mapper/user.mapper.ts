import { UserEntity } from '@/modules/user/entity/user.entity';
import { User } from '@prisma/client';

// User mapper for converting Prisma User to UserEntity

export class UserMapper {
  static toEntity(schema: User): UserEntity {
    return new UserEntity({
      name: schema.name,
      hallId: schema.hallId,
      email: schema.email,
      role: schema.role,
      lastLoginAt: schema.lastLoginAt,
    });
  }
}
