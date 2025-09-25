import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

const { nanoid } = require('nanoid');

import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';

import { MobileRecipientDto } from '@/modules/invitation/dto/request/add-recipients-request.dto';
import { InvitationRecipientRepository } from '@/modules/invitation-recipient/repository/invitation-recipient.repository';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';

@Injectable()
export class InvitationRecipientService {
  constructor(private readonly invitationRecipientRepository: InvitationRecipientRepository) {}

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
}
