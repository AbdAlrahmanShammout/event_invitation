import { UserRole } from '@/modules/user/enum/general.enum';

export type CreateUserRepoInput = {
  name: string;
  hallId?: bigint;
  email: string;
  role: UserRole;
  passwordHash: string;
};
