import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserFullType } from '@/providers/database/prisma/schema-prisma.type';

// User mapper for converting Prisma User to UserEntity

export class UserMapper {
  static toEntity(schema: UserFullType): UserEntity {
    return new UserEntity({
      name: schema.name,
      hallId: schema.hallId,
      email: schema.email,
      role: schema.role,
      lastLoginAt: schema.lastLoginAt,
    });
  }
}
