import { Injectable } from '@nestjs/common';
import { HallAccountStatus as PrismaHallAccountStatus } from '@prisma/client';

import {
  GetCreditTransactionsInput,
  RechargeHallCreditsInput,
  SetHallAccountStatusInput,
} from '@/modules/hall/defs/hall-account.defs';
import { HallAccountStateEntity } from '@/modules/hall/entity/hall-account-state.entity';
import { HallCreditBalanceEntity } from '@/modules/hall/entity/hall-credit-balance.entity';
import { HallCreditTransactionEntity } from '@/modules/hall/entity/hall-credit-transaction.entity';
import { HallAccountStatus, HallCreditTransactionType } from '@/modules/hall/enum/general.enum';
import { HallAccountRepository } from '@/modules/hall/repository/hall-account.repository';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

@Injectable()
export class HallAccountPrismaRepository implements HallAccountRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAccountState(hallId: number): Promise<HallAccountStateEntity | null> {
    const row = await this.prismaService.hallAccountState.findUnique({
      where: { hallId },
    });
    if (!row) return null;
    return this.mapAccountState(row);
  }

  async setAccountStatus(input: SetHallAccountStatusInput): Promise<HallAccountStateEntity> {
    const row = await this.prismaService.hallAccountState.upsert({
      where: { hallId: input.hallId },
      create: {
        hallId: input.hallId,
        status: input.status as unknown as PrismaHallAccountStatus,
        reason: input.reason,
        changedById: input.changedById,
      },
      update: {
        status: input.status as unknown as PrismaHallAccountStatus,
        reason: input.reason,
        changedById: input.changedById,
      },
    });
    return this.mapAccountState(row);
  }

  async getCreditBalance(hallId: number): Promise<HallCreditBalanceEntity | null> {
    const row = await this.prismaService.hallCreditBalance.findUnique({
      where: { hallId },
    });
    if (!row) return null;
    return {
      hallId: row.hallId,
      availableCredits: row.availableCredits,
      reservedCredits: row.reservedCredits,
      updatedAt: row.updatedAt,
    };
  }

  async rechargeCredits(input: RechargeHallCreditsInput): Promise<HallCreditTransactionEntity> {
    const [, transaction] = await this.prismaService.$transaction(async (tx) => {
      const balance = await tx.hallCreditBalance.upsert({
        where: { hallId: input.hallId },
        create: {
          hallId: input.hallId,
          availableCredits: input.amount,
          reservedCredits: 0,
        },
        update: {
          availableCredits: { increment: input.amount },
        },
      });

      const newTransaction = await tx.hallCreditTransaction.create({
        data: {
          hallId: input.hallId,
          type: 'recharge',
          amount: input.amount,
          balanceAfter: balance.availableCredits,
          performedById: input.performedById,
          reference: input.reference,
        },
      });

      return [balance, newTransaction];
    });

    return this.mapTransaction(transaction);
  }

  async getCreditTransactions(
    input: GetCreditTransactionsInput,
  ): Promise<HallCreditTransactionEntity[]> {
    const rows = await this.prismaService.hallCreditTransaction.findMany({
      where: {
        hallId: input.hallId,
        ...(input.type ? { type: input.type } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: input.limit ?? 20,
      skip: input.offset ?? 0,
    });
    return rows.map((r) => this.mapTransaction(r));
  }

  private mapAccountState(row: any): HallAccountStateEntity {
    return {
      id: row.id,
      hallId: row.hallId,
      status: row.status as unknown as HallAccountStatus,
      reason: row.reason ?? undefined,
      changedById: row.changedById ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private mapTransaction(row: any): HallCreditTransactionEntity {
    return {
      id: row.id,
      hallId: row.hallId,
      type: row.type as unknown as HallCreditTransactionType,
      amount: row.amount,
      balanceAfter: row.balanceAfter,
      performedById: row.performedById ?? undefined,
      reference: row.reference ?? undefined,
      createdAt: row.createdAt,
    };
  }
}
