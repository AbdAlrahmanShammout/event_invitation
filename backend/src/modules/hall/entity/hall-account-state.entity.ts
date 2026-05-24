import { HallAccountStatus } from '@/modules/hall/enum/general.enum';

export class HallAccountStateEntity {
  id: number;
  hallId: number;
  status: HallAccountStatus;
  reason?: string;
  changedById?: number;
  createdAt: Date;
  updatedAt: Date;
}
