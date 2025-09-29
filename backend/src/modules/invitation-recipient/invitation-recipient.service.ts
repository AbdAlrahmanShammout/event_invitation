import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { MobileRecipientDto } from '@/modules/invitation/dto/request/add-recipients-request.dto';
import { InvitationRecipientRepository } from '@/modules/invitation-recipient/repository/invitation-recipient.repository';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { InvitationMessageRepository } from '@/modules/invitation-message/repository/invitation-message.repository';

@Injectable()
export class InvitationRecipientService {
  constructor(
    private readonly invitationRecipientRepository: InvitationRecipientRepository,
    private readonly invitationMessageRepository: InvitationMessageRepository,
  ) {}

  async addRecipients(input: {
    invitationId: number;
    recipients: MobileRecipientDto[];
  }): Promise<void> {
    // Check for duplicate phone numbers in current submission
    const phoneNumbers = input.recipients.map((r) => r.phoneNumber);
    const uniquePhoneNumbers = new Set(phoneNumbers);
    if (phoneNumbers.length !== uniquePhoneNumbers.size) {
      throw new BadRequestException('Duplicate phone numbers found in submission');
    }

    // Check for existing phone numbers in database
    const existingPhoneNumbers = await this.invitationRecipientRepository.findExistingPhoneNumbers(
      input.invitationId,
      Array.from(uniquePhoneNumbers),
    );

    if (existingPhoneNumbers.length > 0) {
      throw new BadRequestException(
        `Phone numbers already exist for this invitation: ${existingPhoneNumbers.join(', ')}`,
      );
    }

    // Create recipients directly
    await this.invitationRecipientRepository.createRecipients({
      invitationId: input.invitationId,
      recipients: input.recipients,
    });
  }

  async getSubmittedGuestsCount(invitationId: number): Promise<number> {
    return await this.invitationRecipientRepository.getRecipientsCountByInvitation(invitationId);
  }

  /**
   * Retrieves all recipients for a specific invitation
   * @param invitationId - The ID of the invitation to get recipients for
   * @returns Array of InvitationRecipientEntity objects
   */
  async findRecipientsByInvitation(invitationId: number): Promise<InvitationRecipientEntity[]> {
    return await this.invitationRecipientRepository.findRecipientsByInvitation(invitationId);
  }

  /**
   * Updates a recipient's details
   * @param recipientId - The ID of the recipient to update
   * @param invitationId - The ID of the invitation the recipient belongs to
   * @param data - The data to update
   * @returns Updated InvitationRecipientEntity
   */
  async updateRecipient(
    recipientId: number,
    invitationId: number,
    data: {
      name?: string;
      phoneNumber?: string;
      notes?: string;
      sentAt?: Date;
    },
  ): Promise<InvitationRecipientEntity> {
    // If phone number is being updated, check for duplicates
    if (data.phoneNumber) {
      const existingPhoneNumbers =
        await this.invitationRecipientRepository.findExistingPhoneNumbers(invitationId, [
          data.phoneNumber,
        ]);

      if (existingPhoneNumbers.length > 0) {
        throw new BadRequestException(
          `Phone number ${data.phoneNumber} already exists for this invitation`,
        );
      }
    }

    return await this.invitationRecipientRepository.updateRecipient(recipientId, data);
  }

  /**
   * Deletes a recipient
   * @param recipientId - The ID of the recipient to delete
   */
  async deleteRecipient(recipientId: number): Promise<void> {
    await this.invitationRecipientRepository.deleteRecipient(recipientId);
  }

  /**
   * Links multiple recipients to a message
   * @param input - Contains messageId and array of recipientIds
   */
  async linkRecipientsToMessage(input: {
    messageId: number;
    recipientIds: number[];
    invitationId: number;
  }): Promise<void> {
    // Validate that the message exists and belongs to the invitation
    const message = await this.invitationMessageRepository.findById(input.messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.invitationId !== input.invitationId) {
      throw new BadRequestException('Message does not belong to this invitation');
    }

    // Validate that all recipients exist and belong to the invitation
    const existingRecipients = await this.invitationRecipientRepository.findRecipientsByInvitation(
      input.invitationId,
    );
    const existingRecipientIds = existingRecipients.map((recipient) => recipient.id);

    const invalidRecipientIds = input.recipientIds.filter(
      (id) => !existingRecipientIds.includes(id),
    );

    if (invalidRecipientIds.length > 0) {
      throw new BadRequestException(
        `Recipients with IDs [${invalidRecipientIds.join(', ')}] do not exist or do not belong to this invitation`,
      );
    }

    // Link recipients to message
    await this.invitationRecipientRepository.linkRecipientsToMessage({
      messageId: input.messageId,
      recipientIds: input.recipientIds,
    });
  }
}
