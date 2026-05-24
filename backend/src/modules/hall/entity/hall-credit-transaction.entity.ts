import { HallCreditTransactionType } from '@/modules/hall/enum/general.enum';

export class HallCreditTransactionEntity {
  id: number;
  hallId: number;
  type: HallCreditTransactionType;
  amount: number;
  balanceAfter: number;
  performedById?: number;
  reference?: string;
  createdAt: Date;
}
