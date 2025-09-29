import { Injectable } from '@nestjs/common';

import { hashString } from '@/common/helpers/bcrypt.helper';
import { CreateUserServiceInput, UpdatePasswordServiceInput, UpdateHallIdServiceInput } from '@/modules/user/defs/user-service.defs';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserRepository } from '@/modules/user/repository/user.repository';

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

  async findByEmailAndPassword(email: string, hashedPassword: string): Promise<UserEntity | null> {
    return this.userRepository.findOneUserByEmailAndHashPassword(email, hashedPassword);
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findUserById(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  async updatePassword(input: UpdatePasswordServiceInput): Promise<UserEntity> {
    const passwordHash = await hashString(input.password);
    return this.userRepository.updatePassword({
      id: input.id,
      passwordHash,
    });
  }

  async updateHallId(input: UpdateHallIdServiceInput): Promise<UserEntity> {
    return this.userRepository.updateHallId({
      id: input.id,
      hallId: input.hallId,
    });
  }
}
