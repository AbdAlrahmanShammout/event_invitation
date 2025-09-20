import { CreateUserRepoInput, UpdatePasswordRepoInput } from '@/modules/user/defs/user-repository.defs';
import { UserEntity } from '@/modules/user/entity/user.entity';

export abstract class UserRepository {
  abstract create(entity: CreateUserRepoInput): Promise<UserEntity>;

  abstract findOneUserByEmailAndHashPassword(
    email: string,
    hashedPassword: string,
  ): Promise<UserEntity | null>;

  abstract findUserById(id: number): Promise<UserEntity | null>;

  abstract findByEmail(email: string): Promise<UserEntity | null>;

  abstract updatePassword(input: UpdatePasswordRepoInput): Promise<UserEntity>;
}
