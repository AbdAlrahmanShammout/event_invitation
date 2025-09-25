import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MobileAuth } from '@/common/decorators/requests/mobile-auth.decorator';
import { MobileAuthGuard, RequireMobilePermission } from '@/common/guards/mobile-auth.guard';
import { InvitationService } from '@/modules/invitation/invitation.service';
import type { MobileTokenPayload } from '@/modules/mobile/types/mobile-token-payload.type';
import { AddRecipientsRequestDto } from '@/modules/invitation/dto/request/add-recipients-request.dto';
import { InvitationRecipientService } from '@/modules/invitation-recipient/invitation-recipient.service';
import { InvitationDetailsResponseDto } from '@/modules/invitation/dto/response/invitation-details.response.dto';
import { InvitationRecipientsListResponseDto } from '@/modules/invitation/dto/response/invitation-recipients-list.response.dto';
import { BaseMessageResponse } from '@/common/base/base-message.response';
import { UpdateRecipientRequestDto } from '@/modules/invitation-recipient/dto/request/update-recipient.request.dto';
import { InvitationRecipientResponse } from '@/modules/invitation-recipient/dto/response/model/invitation-recipient.response';

@ApiTags('invitation-mobile')
@Controller('invitation')
@UseGuards(MobileAuthGuard)
@ApiHeader({
  name: 'X-Invitation-Token',
  description: 'JWT token from QR code for accessing invitation',
  required: true,
  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
})
export class InvitationMobileController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly invitationRecipientService: InvitationRecipientService,
  ) {}

  @Get('test')
  @ApiOperation({
    summary: 'Test mobile authentication',
    description: 'Simple endpoint to test if mobile token is valid',
  })
  @ApiResponse({
    status: 200,
    description: 'Token is valid',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Mobile authentication successful' },
        invitationId: { type: 'number', example: 123 },
        permissions: {
          type: 'array',
          items: { type: 'string' },
          example: ['read_invitation', 'add_recipients'],
        },
      },
    },
  })
  async testAuth(@MobileAuth() mobileAuth: MobileTokenPayload) {
    return {
      message: 'Mobile authentication successful',
      invitationId: mobileAuth.invitationId,
      permissions: mobileAuth.permissions,
    };
  }

  @Get('details')
  @RequireMobilePermission('read_invitation')
  @ApiOperation({
    summary: 'Get invitation details for mobile',
    description: 'Retrieves invitation details for the mobile app using the QR token',
  })
  @ApiResponse({
    status: 200,
    description: 'Invitation details retrieved successfully',
    type: InvitationDetailsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Token does not have read permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Invitation not found',
  })
  async getInvitationDetails(
    @MobileAuth() mobileAuth: MobileTokenPayload,
  ): Promise<InvitationDetailsResponseDto> {
    const invitationDetails = await this.invitationService.getInvitationDetails(
      mobileAuth.invitationId,
    );

    return new InvitationDetailsResponseDto(invitationDetails);
  }

  @Post('add')
  @RequireMobilePermission('add_recipients')
  @ApiOperation({
    summary: 'Submit guest list',
    description: 'Submits a list of guests to be invited. Requires hall approval.',
  })
  @ApiResponse({
    status: 201,
    description: 'Recipients submitted successfully',
    type: BaseMessageResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid guest data or submission limit exceeded',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Token does not have add_recipients permission or submissions closed',
  })
  async addRecipients(
    @Body() addRecipientsDto: AddRecipientsRequestDto,
    @MobileAuth() mobileAuth: MobileTokenPayload,
  ): Promise<BaseMessageResponse> {
    // Validate invitation exists
    const invitation = await this.invitationService.getInvitationById({
      id: mobileAuth.invitationId,
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    await this.invitationRecipientService.addRecipients({
      invitationId: mobileAuth.invitationId,
      recipients: addRecipientsDto.recipients,
    });

    return new BaseMessageResponse('success');
  }

  @Get('recipients')
  @RequireMobilePermission('read_invitation')
  @ApiOperation({
    summary: 'Get all recipients for the invitation',
    description: 'Returns a list of all recipients submitted for this invitation',
  })
  @ApiResponse({
    status: 200,
    description: 'Recipients retrieved successfully',
    type: InvitationRecipientsListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Missing required permission',
  })
  async getRecipients(
    @MobileAuth() mobileAuth: MobileTokenPayload,
  ): Promise<InvitationRecipientsListResponseDto> {
    const recipients = await this.invitationRecipientService.findRecipientsByInvitation(
      mobileAuth.invitationId,
    );

    return {
      recipients,
      total: recipients.length,
    };
  }

  @Patch('recipients/:id')
  @RequireMobilePermission('update_recipients')
  @ApiOperation({
    summary: 'Update a recipient',
    description: 'Updates the details of a specific recipient',
  })
  @ApiResponse({
    status: 200,
    description: 'Recipient updated successfully',
    type: InvitationRecipientResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid data or duplicate phone number',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Missing required permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Recipient not found',
  })
  async updateRecipient(
    @Param('id', ParseIntPipe) recipientId: number,
    @MobileAuth() mobileAuth: MobileTokenPayload,
    @Body() updateData: UpdateRecipientRequestDto,
  ): Promise<InvitationRecipientResponse> {
    const updated = await this.invitationRecipientService.updateRecipient(
      recipientId,
      mobileAuth.invitationId,
      {
        name: updateData.name,
        phoneNumber: updateData.phoneNumber,
        notes: updateData.notes,
        sentAt: updateData.sentAt,
      },
    );

    return new InvitationRecipientResponse(updated);
  }

  @Delete('recipients/:id')
  @RequireMobilePermission('delete_recipients')
  @ApiOperation({
    summary: 'Delete a recipient',
    description: 'Removes a recipient from the invitation',
  })
  @ApiResponse({
    status: 200,
    description: 'Recipient deleted successfully',
    type: BaseMessageResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Missing required permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Recipient not found',
  })
  async deleteRecipient(
    @Param('id', ParseIntPipe) recipientId: number,
  ): Promise<BaseMessageResponse> {
    await this.invitationRecipientService.deleteRecipient(recipientId);
    return new BaseMessageResponse('Recipient deleted successfully');
  }

  // todo check if invitation is active or deadline for update, delete and add
}
