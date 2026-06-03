import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { LoggedInUser } from '@/common/decorators/requests/logged-in-user.decorator';
import { Roles } from '@/common/decorators/route/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { ChangeHallStatusRequestDto } from '@/modules/hall/dto/request/change-hall-status-request.dto';
import { CreateHallRequestDto } from '@/modules/hall/dto/request/create-hall-request.dto';
import { GetAdminHallsRequestDto } from '@/modules/hall/dto/request/get-admin-halls-request.dto';
import { GetCreditTransactionsRequestDto } from '@/modules/hall/dto/request/get-credit-transactions-request.dto';
import { RechargeHallRequestDto } from '@/modules/hall/dto/request/recharge-hall-request.dto';
import { UpdateHallRequestDto } from '@/modules/hall/dto/request/update-hall-request.dto';
import { HallAccountStateResponseDto } from '@/modules/hall/dto/response/hall-account-state.response.dto';
import { HallAdminDetailResponseDto } from '@/modules/hall/dto/response/hall-admin-detail.response.dto';
import { HallCreditTransactionResponseDto } from '@/modules/hall/dto/response/hall-credit-transaction.response.dto';
import { CreateHallResponseDto } from '@/modules/hall/dto/response/create-hall-response.dto';
import { GetHallsResponseDto } from '@/modules/hall/dto/response/get-halls-response.dto';
import { HallResponseDto } from '@/modules/hall/dto/response/hall-response.dto';
import { HallAccountService } from '@/modules/hall/hall-account.service';
import { HallService } from '@/modules/hall/hall.service';
import { UserRole } from '@/modules/user/enum/general.enum';
import { UserEntity } from '@/modules/user/entity/user.entity';

/**
 * Handles hall management endpoints restricted to super admins.
 */
@ApiTags('Admin - Halls')
@Controller('admin/halls')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@ApiBearerAuth()
export class HallAdminController {
  constructor(
    private readonly hallService: HallService,
    private readonly hallAccountService: HallAccountService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a hall with owner account' })
  @ApiBody({ type: CreateHallRequestDto })
  @ApiResponse({ status: 201, type: CreateHallResponseDto })
  async createHall(@Body() input: CreateHallRequestDto): Promise<CreateHallResponseDto> {
    const hall = await this.hallService.createHallWithOwner({
      hallName: input.hallName,
      hallDescription: input.hallDescription,
      hallAddress: input.hallAddress,
      hallEmail: input.hallEmail,
      hallPhone: input.hallPhone,
      ownerName: input.ownerName,
      ownerEmail: input.ownerEmail,
      ownerPassword: input.ownerPassword,
    });
    return new CreateHallResponseDto(hall);
  }

  @Get()
  @ApiOperation({ summary: 'List all halls with optional status filter' })
  @ApiResponse({ status: 200, type: GetHallsResponseDto })
  async getHalls(@Query() query: GetAdminHallsRequestDto): Promise<GetHallsResponseDto> {
    const halls = await this.hallService.getHalls({
      status: query.status,
      limit: query.limit,
      offset: query.offset,
    });
    return new GetHallsResponseDto(halls);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hall details including account state and credits' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: HallAdminDetailResponseDto })
  async getHall(@Param('id', ParseIntPipe) id: number): Promise<HallAdminDetailResponseDto> {
    const [hall, accountState, creditBalance] = await Promise.all([
      this.hallService.getHallById(id),
      this.hallAccountService.getAccountState(id),
      this.hallAccountService.getCreditBalance(id),
    ]);
    return new HallAdminDetailResponseDto({ hall, accountState, creditBalance });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update hall profile information' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateHallRequestDto })
  @ApiResponse({ status: 200, type: HallResponseDto })
  async updateHall(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHallRequestDto,
  ): Promise<HallResponseDto> {
    const hall = await this.hallService.updateHallProfile({
      id,
      name: body.name,
      description: body.description,
      address: body.address,
      email: body.email,
      phone: body.phone,
    });
    return new HallResponseDto(hall);
  }

  @Post(':id/suspend')
  @ApiOperation({ summary: 'Suspend a hall account' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: ChangeHallStatusRequestDto })
  @ApiResponse({ status: 200, type: HallAccountStateResponseDto })
  async suspendHall(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ChangeHallStatusRequestDto,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<HallAccountStateResponseDto> {
    const state = await this.hallAccountService.suspendHall({
      hallId: id,
      reason: body.reason,
      changedById: currentUser.id,
    });
    return new HallAccountStateResponseDto(state);
  }

  @Post(':id/freeze')
  @ApiOperation({ summary: 'Freeze a hall account (blocks operations, keeps data)' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: ChangeHallStatusRequestDto })
  @ApiResponse({ status: 200, type: HallAccountStateResponseDto })
  async freezeHall(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ChangeHallStatusRequestDto,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<HallAccountStateResponseDto> {
    const state = await this.hallAccountService.freezeHall({
      hallId: id,
      reason: body.reason,
      changedById: currentUser.id,
    });
    return new HallAccountStateResponseDto(state);
  }

  @Post(':id/reactivate')
  @ApiOperation({ summary: 'Reactivate a suspended or frozen hall account' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: HallAccountStateResponseDto })
  async reactivateHall(
    @Param('id', ParseIntPipe) id: number,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<HallAccountStateResponseDto> {
    const state = await this.hallAccountService.reactivateHall({
      hallId: id,
      changedById: currentUser.id,
    });
    return new HallAccountStateResponseDto(state);
  }

  @Post(':id/recharge')
  @ApiOperation({ summary: 'Recharge credits for a hall account' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: RechargeHallRequestDto })
  @ApiResponse({ status: 201, type: HallCreditTransactionResponseDto })
  async rechargeHall(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RechargeHallRequestDto,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<HallCreditTransactionResponseDto> {
    const transaction = await this.hallAccountService.rechargeCredits({
      hallId: id,
      amount: body.amount,
      performedById: currentUser.id,
      reference: body.reference,
    });
    return new HallCreditTransactionResponseDto(transaction);
  }

  @Get(':id/credit-transactions')
  @ApiOperation({ summary: 'List credit transactions for a hall' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: [HallCreditTransactionResponseDto] })
  async getCreditTransactions(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetCreditTransactionsRequestDto,
  ): Promise<HallCreditTransactionResponseDto[]> {
    const transactions = await this.hallAccountService.getCreditTransactions({
      hallId: id,
      type: query.type,
      limit: query.limit,
      offset: query.offset,
    });
    return transactions.map((t) => new HallCreditTransactionResponseDto(t));
  }
}
