import { HallStatus } from '@/modules/hall/enum/general.enum';

export type CreateHallRepoInput = {
  name: string;
  description?: string;
  address: string;
  email: string;
  phone: string;
  ownerId: number;
};

export type UpdateHallRepoInput = {
  id: number;
  name?: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
};

export type GetHallsRepoInput = {
  status?: HallStatus;
  limit?: number;
  offset?: number;
};
