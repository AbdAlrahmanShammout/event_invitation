import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { HallFullType } from '@/providers/database/prisma/schema-prisma.type';
import { UserMapper } from '@/modules/user/mapper/user.mapper';
import { InvitationMapper } from '@/modules/invitation/mapper/invitation.mapper';

export class HallMapper {
  static toEntity(schema: HallFullType): HallEntity {
    return new HallEntity({
      id: schema.id,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      name: schema.name,
      description: schema.description,
      address: schema.address,
      email: schema.email,
      phone: schema.phone,
      status: schema.status,
      ownerId: schema.ownerId,
      balance: schema.balance,
      owner: schema.owner ? UserMapper.toEntity(schema.owner) : null,
      employees: schema.employees ? schema.employees.map((e) => UserMapper.toEntity(e)) : null,
      invitations: schema.invitations
        ? schema.invitations.map((e) => InvitationMapper.toEntity(e))
        : null,
    });
  }
}
