import {
  GetCreditTransactionsInput,
  RechargeHallCreditsInput,
  SetHallAccountStatusInput,
} from '@/modules/hall/defs/hall-account.defs';
import { HallAccountStateEntity } from '@/modules/hall/entity/hall-account-state.entity';
import { HallCreditBalanceEntity } from '@/modules/hall/entity/hall-credit-balance.entity';
import { HallCreditTransactionEntity } from '@/modules/hall/entity/hall-credit-transaction.entity';

export abstract class HallAccountRepository {
  abstract getAccountState(hallId: number): Promise<HallAccountStateEntity | null>;

  abstract setAccountStatus(input: SetHallAccountStatusInput): Promise<HallAccountStateEntity>;

  abstract getCreditBalance(hallId: number): Promise<HallCreditBalanceEntity | null>;

  abstract rechargeCredits(input: RechargeHallCreditsInput): Promise<HallCreditTransactionEntity>;

  abstract getCreditTransactions(
    input: GetCreditTransactionsInput,
  ): Promise<HallCreditTransactionEntity[]>;
}
