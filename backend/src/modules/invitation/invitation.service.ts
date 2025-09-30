import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateInvitationServiceInput,
  GetInvitationServiceInput,
  GetInvitationsServiceInput,
  UpdateInvitationServiceInput,
} from '@/modules/invitation/defs/invitation-service.defs';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationStatus } from '@/modules/invitation/enum/general.enum';
import { InvitationRepository } from '@/modules/invitation/repository/invitation.repository';
import { HallService } from '@/modules/hall/hall.service';
import { InvitationRecipientService } from '@/modules/invitation-recipient/invitation-recipient.service';
import { HallEntity } from '@/modules/hall/entity/hall.entity';

@Injectable()
export class InvitationService {
  constructor(
    private readonly invitationRepository: InvitationRepository,
    private readonly hallService: HallService,
    private readonly invitationRecipientService: InvitationRecipientService,
  ) {}

  async createInvitation(input: CreateInvitationServiceInput): Promise<InvitationEntity> {
    return await this.invitationRepository.create({
      title: input.title,
      description: input.description,
      eventDate: input.eventDate,
      maxGuestsAllowed: input.maxGuestsAllowed,
      hallId: input.hallId,
      creatorId: input.creatorId,
    });
  }

  async getInvitationById(input: GetInvitationServiceInput): Promise<InvitationEntity> {
    const invitation = await this.invitationRepository.getById({
      id: input.id,
      includeCreator: input.includeCreator,
      includeMessages: input.includeMessages,
      includeRecipients: input.includeRecipients,
    });

    if (!invitation) {
      throw new NotFoundException(`Invitation with ID ${input.id} not found`);
    }

    // Check if the invitation belongs to the user's hall
    if (input.userHallId && invitation.hallId !== input.userHallId) {
      throw new NotFoundException(`Invitation with ID ${input.id} not found`);
    }

    return invitation;
  }

  async getInvitations(input: GetInvitationsServiceInput): Promise<InvitationEntity[]> {
    return await this.invitationRepository.getAll({
      hallId: input.hallId,
      creatorId: input.creatorId,
      status: input.status,
      eventDateFrom: input.eventDateFrom,
      eventDateTo: input.eventDateTo,
      includeCreator: input.includeCreator,
      includeMessages: input.includeMessages,
      includeRecipients: input.includeRecipients,
      limit: input.limit || 20,
      offset: input.offset || 0,
    });
  }

  async updateInvitation(input: UpdateInvitationServiceInput): Promise<InvitationEntity> {
    // First check if invitation exists and belongs to user's hall
    await this.getInvitationById({
      id: input.id,
      userHallId: input.userHallId,
    });

    return await this.invitationRepository.update({
      id: input.id,
      title: input.title,
      description: input.description,
      eventDate: input.eventDate,
      startSendAt: input.startSendAt,
    });
  }

  async approveInvitation(input: { id: number; userHallId: number }): Promise<InvitationEntity> {
    // First check if invitation exists and belongs to user's hall
    const invitation = await this.getInvitationById({
      id: input.id,
      userHallId: input.userHallId,
    });

    // Validate that the invitation can be approved
    if (invitation.status !== InvitationStatus.PENDING_APPROVAL) {
      throw new BadRequestException(
        `Invitation cannot be approved. Current status: ${invitation.status}. Expected status: ${InvitationStatus.PENDING_APPROVAL}`,
      );
    }

    // Update the invitation status to APPROVED
    const updatedInvitation = await this.invitationRepository.update({
      id: input.id,
      status: InvitationStatus.APPROVED,
    });

    return updatedInvitation;
  }

  async submitForApproval(input: { id: number; userHallId?: number }): Promise<InvitationEntity> {
    // First check if invitation exists
    const invitation = await this.getInvitationById({
      id: input.id,
      userHallId: input.userHallId,
    });

    // Validate that the invitation can be submitted for approval
    if (invitation.status !== InvitationStatus.DRAFT) {
      throw new BadRequestException(
        `Invitation cannot be submitted for approval. Current status: ${invitation.status}. Expected status: ${InvitationStatus.DRAFT}`,
      );
    }

    // Check if startSendAt is set
    if (!invitation.startSendAt) {
      throw new BadRequestException(
        'Cannot submit invitation for approval: Start send date/time (startSendAt) must be set',
      );
    }

    // Get all recipients for this invitation
    const recipients = await this.invitationRecipientService.findRecipientsByInvitation(input.id);

    // Check if we have any recipients
    if (recipients.length === 0) {
      throw new BadRequestException('Cannot submit invitation for approval: No recipients added');
    }

    // Check if recipient count is within the allowed limit
    if (recipients.length > invitation.maxGuestsAllowed) {
      throw new BadRequestException(
        `Cannot submit invitation for approval: Number of recipients (${recipients.length}) exceeds maximum allowed (${invitation.maxGuestsAllowed})`,
      );
    }

    // Check if all recipients have required fields
    const recipientsWithoutMessage = recipients.filter(
      (recipient) => !recipient.invitationMessageId,
    );
    if (recipientsWithoutMessage.length > 0) {
      throw new BadRequestException(
        `Cannot submit invitation for approval: ${recipientsWithoutMessage.length} recipients do not have a message assigned`,
      );
    }

    // All validations passed, update status to PENDING_APPROVAL
    const updatedInvitation = await this.invitationRepository.update({
      id: input.id,
      status: InvitationStatus.PENDING_APPROVAL,
    });

    return updatedInvitation;
  }

  async deleteInvitation(id: number, userHallId?: number): Promise<void> {
    // First check if invitation exists and belongs to user's hall
    await this.getInvitationById({ id, userHallId });

    await this.invitationRepository.delete(id);
  }

  async generateQRCode(input: {
    invitationId: number;
    hallId: number;
    grantedBy: number;
    expiresInDays?: number;
  }): Promise<{
    qrData: any;
    expiresAt: Date;
  }> {
    // First verify invitation exists and belongs to the hall
    await this.getInvitationById({
      id: input.invitationId,
      userHallId: input.hallId,
    });

    // Generate QR code data using MobileTokenService
    // Note: We would need to inject MobileTokenService here
    // For now, keeping the placeholder structure
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (input.expiresInDays || 30));

    return {
      qrData: {
        invitationId: input.invitationId,
        accessToken: 'placeholder_token', // Would be generated by MobileTokenService
        appUrl: process.env.MOBILE_APP_URL || 'https://app.yourplatform.com/invitation/access',
      },
      expiresAt,
    };
  }

  async getInvitationDetails(invitationId: number): Promise<{
    invitation: InvitationEntity;
    hall: HallEntity;
    submittedGuestsCount: number;
  }> {
    // Get invitation with hall details
    const invitation = await this.getInvitationById({
      id: invitationId,
      includeCreator: false,
      includeMessages: false,
      includeRecipients: false,
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    // Get hall details using our new findHallById method
    const hall = await this.hallService.findHallById(invitation.hallId);

    if (!hall) {
      throw new NotFoundException('Hall not found');
    }

    // Get current submission count
    const submittedGuestsCount =
      await this.invitationRecipientService.getSubmittedGuestsCount(invitationId);

    return {
      invitation,
      hall,
      submittedGuestsCount,
    };
  }

  canStillSubmitGuests(invitation: InvitationEntity): boolean {
    const now = new Date();
    return now < invitation.submissionDeadline;
  }
}
