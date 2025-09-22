import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateInvitationServiceInput,
  GetInvitationServiceInput,
  GetInvitationsServiceInput,
  UpdateInvitationServiceInput,
} from '@/modules/invitation/defs/invitation-service.defs';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationRepository } from '@/modules/invitation/repository/invitation.repository';

@Injectable()
export class InvitationService {
  constructor(private readonly invitationRepository: InvitationRepository) {}

  async createInvitation(input: CreateInvitationServiceInput): Promise<InvitationEntity> {
    return await this.invitationRepository.create({
      title: input.title,
      description: input.description,
      eventDate: input.eventDate,
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
    });
  }

  async deleteInvitation(id: number, userHallId?: number): Promise<void> {
    // First check if invitation exists and belongs to user's hall
    await this.getInvitationById({ id, userHallId });

    await this.invitationRepository.delete(id);
  }
}
