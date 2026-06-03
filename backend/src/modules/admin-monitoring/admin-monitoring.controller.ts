import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@/common/decorators/route/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { GetPhoneNumbersRequestDto } from '@/modules/admin-monitoring/dto/get-phone-numbers-request.dto';
import {
  AdminMonitoringService,
  PhoneNumberEntry,
  PlatformOverview,
} from '@/modules/admin-monitoring/admin-monitoring.service';
import { UserRole } from '@/modules/user/enum/general.enum';

/**
 * Platform-wide monitoring endpoints restricted to super admins.
 */
@ApiTags('Admin - Monitoring')
@Controller('admin/monitoring')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@ApiBearerAuth()
export class AdminMonitoringController {
  constructor(private readonly adminMonitoringService: AdminMonitoringService) {}

  @Get('overview')
  @ApiOperation({
    summary: 'Platform overview',
    description: 'Returns counts for halls, invitations, recipients, and WhatsApp session health.',
  })
  @ApiResponse({ status: 200 })
  async getOverview(): Promise<PlatformOverview> {
    return this.adminMonitoringService.getPlatformOverview();
  }

  @Get('phone-numbers')
  @ApiOperation({
    summary: 'List registered phone numbers',
    description: 'Returns guest phone numbers from invitation recipients with optional filters.',
  })
  @ApiResponse({ status: 200 })
  async getPhoneNumbers(@Query() query: GetPhoneNumbersRequestDto): Promise<PhoneNumberEntry[]> {
    return this.adminMonitoringService.getPhoneNumbers({
      hallId: query.hallId,
      search: query.search,
      limit: query.limit,
      offset: query.offset,
    });
  }
}
