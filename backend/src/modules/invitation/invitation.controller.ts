import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreateInvitationRequestDto } from '@/modules/invitation/dto/request/create-invitation-request.dto';
import { GetInvitationRequestDto } from '@/modules/invitation/dto/request/get-invitation-request.dto';
import { GetInvitationsRequestDto } from '@/modules/invitation/dto/request/get-invitations-request.dto';
import { UpdateInvitationRequestDto } from '@/modules/invitation/dto/request/update-invitation-request.dto';
import { BaseMessageResponse } from '@/common/base/base-message.response';
import { CreateInvitationResponseDto } from '@/modules/invitation/dto/response/create-invitation-response.dto';
import { GetInvitationResponseDto } from '@/modules/invitation/dto/response/get-invitation-response.dto';
import { GetInvitationsResponseDto } from '@/modules/invitation/dto/response/get-invitations-response.dto';
import { UpdateInvitationResponseDto } from '@/modules/invitation/dto/response/update-invitation-response.dto';
import { InvitationService } from '@/modules/invitation/invitation.service';
import { LoggedInUser } from '@/common/decorators/requests/logged-in-user.decorator';
import { UserEntity } from '@/modules/user/entity/user.entity';

@ApiTags('invitations')
@Controller('invitation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new invitation',
    description:
      'Creates a new invitation for an event. The hall ID is automatically derived from the authenticated user.',
  })
  @ApiBody({ type: CreateInvitationRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Invitation created successfully',
    type: CreateInvitationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User must be associated with a hall',
  })
  async createInvitation(
    @Body() createInvitationDto: CreateInvitationRequestDto,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<CreateInvitationResponseDto> {
    if (!currentUser.hallId) {
      throw new ForbiddenException('User must be associated with a hall to create invitations');
    }

    const invitation = await this.invitationService.createInvitation({
      title: createInvitationDto.title,
      description: createInvitationDto.description,
      eventDate: createInvitationDto.eventDate,
      maxGuestsAllowed: createInvitationDto.maxGuestsAllowed,
      hallId: currentUser.hallId,
      creatorId: currentUser.id,
    });

    return new CreateInvitationResponseDto(invitation);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get invitation by ID',
    description: 'Retrieves a specific invitation by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Invitation ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Invitation retrieved successfully',
    type: GetInvitationResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  async getInvitationById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetInvitationRequestDto,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<GetInvitationResponseDto> {
    if (!currentUser.hallId) {
      throw new ForbiddenException('User must be associated with a hall to view invitations');
    }

    const invitation = await this.invitationService.getInvitationById({
      id,
      includeCreator: query.includeCreator,
      includeMessages: query.includeMessages,
      includeRecipients: query.includeRecipients,
      userHallId: currentUser.hallId,
    });

    return new GetInvitationResponseDto(invitation);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all invitations',
    description:
      "Retrieves a list of invitations for the authenticated user's hall with optional filtering by status and event date",
  })
  @ApiQuery({
    name: 'status',
    description: 'Filter by invitation status',
    enum: [
      'DRAFT',
      'PENDING_APPROVAL',
      'APPROVED',
      'SENDING',
      'COMPLETED',
      'COMPLETED_WITH_ERRORS',
    ],
    required: false,
  })
  @ApiQuery({
    name: 'eventDateFrom',
    description: 'Filter events from this date onwards (ISO format)',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @ApiQuery({
    name: 'eventDateTo',
    description: 'Filter events up to this date (ISO format)',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Invitations retrieved successfully',
    type: GetInvitationsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User must be associated with a hall',
  })
  async getInvitations(
    @Query() query: GetInvitationsRequestDto,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<GetInvitationsResponseDto> {
    if (!currentUser.hallId) {
      throw new ForbiddenException('User must be associated with a hall to view invitations');
    }

    const invitations = await this.invitationService.getInvitations({
      hallId: currentUser.hallId, // Always filter by user's hall
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

  @Put(':id')
  @ApiOperation({
    summary: 'Update invitation',
    description: 'Updates an existing invitation',
  })
  @ApiParam({
    name: 'id',
    description: 'Invitation ID',
    type: 'number',
    example: 1,
  })
  @ApiBody({ type: UpdateInvitationRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Invitation updated successfully',
    type: UpdateInvitationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  async updateInvitation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvitationDto: UpdateInvitationRequestDto,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<UpdateInvitationResponseDto> {
    if (!currentUser.hallId) {
      throw new ForbiddenException('User must be associated with a hall to update invitations');
    }

    const invitation = await this.invitationService.updateInvitation({
      id,
      title: updateInvitationDto.title,
      description: updateInvitationDto.description,
      eventDate: updateInvitationDto.eventDate,
      startSendAt: updateInvitationDto.startSendAt,
      userHallId: currentUser.hallId,
    });

    return new UpdateInvitationResponseDto(invitation);
  }

  @Post(':id/approve')
  @ApiOperation({
    summary: 'Approve invitation',
    description: 'Approves an invitation, changing its status from PENDING_APPROVAL to APPROVED',
  })
  @ApiParam({
    name: 'id',
    description: 'Invitation ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Invitation approved successfully',
    type: BaseMessageResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invitation cannot be approved (wrong status)',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User must be associated with a hall',
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  async approveInvitation(
    @Param('id', ParseIntPipe) id: number,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<BaseMessageResponse> {
    if (!currentUser.hallId) {
      throw new ForbiddenException('User must be associated with a hall to approve invitations');
    }

    await this.invitationService.approveInvitation({
      id,
      userHallId: currentUser.hallId,
    });

    return new BaseMessageResponse('Invitation approved successfully');
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete invitation',
    description: 'Deletes an existing invitation',
  })
  @ApiParam({
    name: 'id',
    description: 'Invitation ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Invitation deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  async deleteInvitation(
    @Param('id', ParseIntPipe) id: number,
    @LoggedInUser() currentUser: UserEntity,
  ): Promise<void> {
    if (!currentUser.hallId) {
      throw new ForbiddenException('User must be associated with a hall to delete invitations');
    }

    await this.invitationService.deleteInvitation(id, currentUser.hallId);
  }

  @Post(':id/generate-qr')
  @ApiOperation({
    summary: 'Generate QR code for mobile access',
    description:
      'Generates a QR code that allows mobile app users to access and submit guests for this invitation',
  })
  @ApiParam({
    name: 'id',
    description: 'Invitation ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 201,
    description: 'QR code generated successfully',
    schema: {
      type: 'object',
      properties: {
        qrData: {
          type: 'object',
          properties: {
            invitationId: { type: 'number', example: 123 },
            accessToken: { type: 'string', example: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...' },
            appUrl: { type: 'string', example: 'https://app.yourplatform.com/invitation/access' },
          },
        },
        qrCodeString: {
          type: 'string',
          example: '{"invitationId":123,"accessToken":"eyJ...","appUrl":"https://..."}',
        },
        expiresAt: { type: 'string', format: 'date-time', example: '2024-12-31T23:59:59.000Z' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User must be associated with a hall',
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  async generateQRCode(
    @Param('id', ParseIntPipe) id: number,
    @LoggedInUser() currentUser: UserEntity,
  ) {
    if (!currentUser.hallId) {
      throw new ForbiddenException('User must be associated with a hall to generate QR codes');
    }

    const qrResult = await this.invitationService.generateQRCode({
      invitationId: id,
      hallId: currentUser.hallId,
      grantedBy: currentUser.id,
    });

    return {
      qrData: qrResult.qrData,
      qrCodeString: JSON.stringify(qrResult.qrData),
      expiresAt: qrResult.expiresAt,
      message: 'QR code generated successfully',
    };
  }
}
