import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationMessageDto } from './dto/create-invitation-message.dto';
import { InvitationMessageRepository } from './repository/invitation-message.repository';
import { InvitationMessageEntity } from './entity/invitation-message.entity';
import { InvitationService } from '../invitation/invitation.service';

@Injectable()
export class InvitationMessageService {
  constructor(
    private readonly invitationMessageRepository: InvitationMessageRepository,
    private readonly invitationService: InvitationService,
  ) {}

  async createMessage(
    invitationId: number,
    createMessageDto: CreateInvitationMessageDto,
  ): Promise<InvitationMessageEntity> {
    // Validate invitation exists
    const invitation = await this.invitationService.getInvitationById({
      id: invitationId,
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    // Create the message
    return this.invitationMessageRepository.create({
      content: createMessageDto.content,
      invitationId,
    });
  }

  async getInvitationMessages(invitationId: number): Promise<InvitationMessageEntity[]> {
    return this.invitationMessageRepository.findByInvitationId(invitationId);
  }

  async updateMessage(
    messageId: number,
    invitationId: number,
    content: string,
  ): Promise<InvitationMessageEntity> {
    const message = await this.invitationMessageRepository.findById(messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.invitationId !== invitationId) {
      throw new NotFoundException('Message not found');
    }

    return this.invitationMessageRepository.update(messageId, { content });
  }

  async deleteMessage(messageId: number, invitationId: number): Promise<void> {
    const message = await this.invitationMessageRepository.findById(messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.invitationId !== invitationId) {
      throw new NotFoundException('Message not found');
    }

    await this.invitationMessageRepository.deleteMessage(messageId);
  }
}
