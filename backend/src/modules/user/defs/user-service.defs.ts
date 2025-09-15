import { UserRole } from '@/modules/user/enum/general.enum';

export type CreateUserServiceInput = {
  name: string;
  hallId?: bigint;
  email: string;
  role: UserRole;
  password: string;
};
