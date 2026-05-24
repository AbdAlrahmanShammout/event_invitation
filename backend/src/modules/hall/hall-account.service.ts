import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  GetCreditTransactionsInput,
  RechargeHallCreditsInput,
  SetHallAccountStatusInput,
} from '@/modules/hall/defs/hall-account.defs';
import { HallAccountStateEntity } from '@/modules/hall/entity/hall-account-state.entity';
import { HallCreditBalanceEntity } from '@/modules/hall/entity/hall-credit-balance.entity';
import { HallCreditTransactionEntity } from '@/modules/hall/entity/hall-credit-transaction.entity';
import { HallAccountStatus } from '@/modules/hall/enum/general.enum';
import { HallAccountRepository } from '@/modules/hall/repository/hall-account.repository';

/**
 * Manages hall operational status and credit ledger operations.
 */
@Injectable()
export class HallAccountService {
  constructor(private readonly hallAccountRepository: HallAccountRepository) {}

  async getAccountState(hallId: number): Promise<HallAccountStateEntity | null> {
    return this.hallAccountRepository.getAccountState(hallId);
  }

  async getCreditBalance(hallId: number): Promise<HallCreditBalanceEntity | null> {
    return this.hallAccountRepository.getCreditBalance(hallId);
  }

  async suspendHall(input: {
    hallId: number;
    reason?: string;
    changedById?: number;
  }): Promise<HallAccountStateEntity> {
    return this.setStatus({
      hallId: input.hallId,
      status: HallAccountStatus.SUSPENDED,
      reason: input.reason,
      changedById: input.changedById,
    });
  }

  async freezeHall(input: {
    hallId: number;
    reason?: string;
    changedById?: number;
  }): Promise<HallAccountStateEntity> {
    return this.setStatus({
      hallId: input.hallId,
      status: HallAccountStatus.FROZEN,
      reason: input.reason,
      changedById: input.changedById,
    });
  }

  async reactivateHall(input: {
    hallId: number;
    changedById?: number;
  }): Promise<HallAccountStateEntity> {
    return this.setStatus({
      hallId: input.hallId,
      status: HallAccountStatus.ACTIVE,
      changedById: input.changedById,
    });
  }

  async rechargeCredits(input: RechargeHallCreditsInput): Promise<HallCreditTransactionEntity> {
    if (input.amount <= 0) {
      throw new BadRequestException('Recharge amount must be greater than zero');
    }
    return this.hallAccountRepository.rechargeCredits(input);
  }

  async getCreditTransactions(
    input: GetCreditTransactionsInput,
  ): Promise<HallCreditTransactionEntity[]> {
    return this.hallAccountRepository.getCreditTransactions(input);
  }

  /**
   * Asserts that a hall is allowed to perform operational actions.
   * Throws ForbiddenException if suspended or frozen.
   */
  async assertHallCanOperate(hallId: number): Promise<void> {
    const state = await this.hallAccountRepository.getAccountState(hallId);
    if (!state) return;
    if (state.status === HallAccountStatus.SUSPENDED) {
      throw new ForbiddenException('Hall account is suspended');
    }
    if (state.status === HallAccountStatus.FROZEN) {
      throw new ForbiddenException('Hall account is frozen');
    }
  }

  private async setStatus(input: SetHallAccountStatusInput): Promise<HallAccountStateEntity> {
    return this.hallAccountRepository.setAccountStatus(input);
  }
}
