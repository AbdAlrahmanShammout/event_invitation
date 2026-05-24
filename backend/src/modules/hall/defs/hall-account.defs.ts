import { HallAccountStatus, HallCreditTransactionType } from '@/modules/hall/enum/general.enum';

export type SetHallAccountStatusInput = {
  hallId: number;
  status: HallAccountStatus;
  reason?: string;
  changedById?: number;
};

export type RechargeHallCreditsInput = {
  hallId: number;
  amount: number;
  performedById?: number;
  reference?: string;
};

export type GetCreditTransactionsInput = {
  hallId: number;
  type?: HallCreditTransactionType;
  limit?: number;
  offset?: number;
};
