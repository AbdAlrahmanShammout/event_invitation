import { UserRole } from '@/modules/user/enum/general.enum';

export type CreateUserServiceInput = {
  name: string;
  hallId?: number;
  email: string;
  role: UserRole;
  password: string;
};

export type UpdatePasswordServiceInput = {
  id: number;
  password: string;
};
