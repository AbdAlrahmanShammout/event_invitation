import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/user/repository/user.repository';
import { CreateUserServiceInput } from '@/modules/user/defs/user-service.defs';
import { hashString } from '@/common/helpers/bcrypt.helper';
import { UserEntity } from '@/modules/user/entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserServiceInput): Promise<UserEntity> {
    const passwordHash = await hashString(input.password);
    const user = await this.userRepository.create({
      name: input.name,
      hallId: input.hallId,
      email: input.email,
      role: input.role,
      passwordHash,
    });

    return user;
  }
}
