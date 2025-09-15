import { UserEntity } from '@/modules/user/entity/user.entity';
import { CreateUserRepoInput } from '@/modules/user/defs/user-repository.defs';

export abstract class UserRepository {
  abstract create(entity: CreateUserRepoInput): Promise<UserEntity>;
}
