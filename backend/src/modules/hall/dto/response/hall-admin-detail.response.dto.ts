import { ApiProperty } from '@nestjs/swagger';

import { HallAccountStateResponseDto } from '@/modules/hall/dto/response/hall-account-state.response.dto';
import { HallCreditBalanceResponseDto } from '@/modules/hall/dto/response/hall-credit-balance.response.dto';
import { HallRespnse } from '@/modules/hall/dto/response/model/hall.respnse';
import { HallAccountStateEntity } from '@/modules/hall/entity/hall-account-state.entity';
import { HallCreditBalanceEntity } from '@/modules/hall/entity/hall-credit-balance.entity';
import { HallEntity } from '@/modules/hall/entity/hall.entity';

export class HallAdminDetailResponseDto {
  @ApiProperty({ type: () => HallRespnse })
  hall: HallRespnse;

  @ApiProperty({ type: () => HallAccountStateResponseDto, required: false })
  accountState?: HallAccountStateResponseDto;

  @ApiProperty({ type: () => HallCreditBalanceResponseDto, required: false })
  creditBalance?: HallCreditBalanceResponseDto;

  constructor(data: {
    hall: HallEntity;
    accountState: HallAccountStateEntity | null;
    creditBalance: HallCreditBalanceEntity | null;
  }) {
    this.hall = new HallRespnse(data.hall);
    this.accountState = data.accountState
      ? new HallAccountStateResponseDto(data.accountState)
      : undefined;
    this.creditBalance = data.creditBalance
      ? new HallCreditBalanceResponseDto(data.creditBalance)
      : undefined;
  }
}
