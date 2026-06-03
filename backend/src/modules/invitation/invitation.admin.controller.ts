import { Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@/common/decorators/route/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { GetAdminInvitationsRequestDto } from '@/modules/invitation/dto/request/get-admin-invitations-request.dto';
import { GetInvitationResponseDto } from '@/modules/invitation/dto/response/get-invitation-response.dto';
import { GetInvitationsResponseDto } from '@/modules/invitation/dto/response/get-invitations-response.dto';
import { UpdateInvitationResponseDto } from '@/modules/invitation/dto/response/update-invitation-response.dto';
import { InvitationService } from '@/modules/invitation/invitation.service';
import { UserRole } from '@/modules/user/enum/general.enum';

/**
 * Handles invitation management endpoints that are restricted to super admins.
 */
@ApiTags('Admin - Invitations')
@Controller('admin/invitations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@ApiBearerAuth()
export class InvitationAdminController {
  constructor(private readonly invitationService: InvitationService) {}

  @Get()
  @ApiOperation({
    summary: 'List invitations as super admin',
    description: 'Returns invitations across all halls, with optional hall and status filters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Invitations retrieved successfully',
    type: GetInvitationsResponseDto,
  })
  async getInvitations(
    @Query() query: GetAdminInvitationsRequestDto,
  ): Promise<GetInvitationsResponseDto> {
    const invitations = await this.invitationService.getInvitations({
      hallId: query.hallId,
      creatorId: query.creatorId,
      status: query.status,
      eventDateFrom: query.eventDateFrom,
      eventDateTo: query.eventDateTo,
      includeCreator: query.includeCreator,
      includeMessages: query.includeMessages,
      includeRecipients: query.includeRecipients,
      limit: query.limit,
      offset: query.offset,
    });
    return new GetInvitationsResponseDto(invitations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an invitation as super admin',
    description: 'Returns an invitation by ID without hall scoping.',
  })
  @ApiParam({ name: 'id', description: 'Invitation ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Invitation retrieved successfully',
    type: GetInvitationResponseDto,
  })
  async getInvitation(@Param('id', ParseIntPipe) id: number): Promise<GetInvitationResponseDto> {
    const invitation = await this.invitationService.getInvitationById({
      id,
      includeCreator: true,
      includeMessages: true,
      includeRecipients: true,
    });
    return new GetInvitationResponseDto(invitation);
  }

  @Post(':id/approve')
  @ApiOperation({
    summary: 'Approve an invitation as super admin',
    description: 'Approves a pending invitation without hall scoping.',
  })
  @ApiParam({ name: 'id', description: 'Invitation ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Invitation approved successfully',
    type: UpdateInvitationResponseDto,
  })
  async approveInvitation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateInvitationResponseDto> {
    const invitation = await this.invitationService.approveInvitation({ id });
    return new UpdateInvitationResponseDto(invitation);
  }
}
