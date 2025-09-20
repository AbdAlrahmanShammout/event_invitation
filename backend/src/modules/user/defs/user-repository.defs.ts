import { UserRole } from '@/modules/user/enum/general.enum';

export type CreateUserRepoInput = {
  name: string;
  hallId?: number;
  email: string;
  role: UserRole;
  passwordHash: string;
};

export type UpdatePasswordRepoInput = {
  id: number;
  passwordHash: string;
};
