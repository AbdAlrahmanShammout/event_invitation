import { CreateUserRepoInput } from '@/modules/user/defs/user-repository.defs';
import { UserEntity } from '@/modules/user/entity/user.entity';

export abstract class UserRepository {
  abstract create(entity: CreateUserRepoInput): Promise<UserEntity>;
}
