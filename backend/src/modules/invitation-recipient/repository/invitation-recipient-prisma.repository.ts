import { Injectable } from '@nestjs/common';

import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { InvitationRecipientMapper } from '@/modules/invitation-recipient/mapper/invitation-recipient.mapper';
import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';
import {
  CreateMobileRecipientsInput,
  InvitationRecipientRepository,
} from '@/modules/invitation-recipient/repository/invitation-recipient.repository';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

@Injectable()
export class InvitationRecipientPrismaRepository implements InvitationRecipientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecipients(input: CreateMobileRecipientsInput): Promise<void> {
    // const submissionId = `sub_${nanoid(12)}`; //todo
    const submittedAt = new Date();

    // Create all recipients with mobile submission data
    await Promise.all(
      input.recipients.map((recipient) =>
        this.prismaService.invitationRecipient.create({
          data: {
            invitationId: input.invitationId,
            recipientName: recipient.name,
            phoneNumber: recipient.phoneNumber,
            notes: recipient.notes,
            messageStatus: MessageStatus.HOLDING,
            submittedAt,
            invitationMessageId: null,
            sendAt: null,
          },
          select: {},
        }),
      ),
    );
  }

  async findRecipientsByInvitation(invitationId: number): Promise<InvitationRecipientEntity[]> {
    const results = await this.prismaService.invitationRecipient.findMany({
      where: {
        invitationId,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return results.map((result) => InvitationRecipientMapper.toEntity(result));
  }

  async getRecipientsCountByInvitation(invitationId: number): Promise<number> {
    return await this.prismaService.invitationRecipient.count({
      where: {
        invitationId,
      },
    });
  }

  async updateRecipientStatus(recipientId: number, status: MessageStatus): Promise<void> {
    await this.prismaService.invitationRecipient.update({
      where: { id: recipientId },
      data: {
        messageStatus: status,
      },
    });
  }

  async findExistingPhoneNumbers(invitationId: number, phoneNumbers: string[]): Promise<string[]> {
    const existingRecipients = await this.prismaService.invitationRecipient.findMany({
      where: {
        invitationId,
        phoneNumber: { in: phoneNumbers },
      },
      select: {
        phoneNumber: true,
      },
    });

    return existingRecipients.map((recipient) => recipient.phoneNumber);
  }

  async updateRecipient(
    recipientId: number,
    data: {
      name?: string;
      phoneNumber?: string;
      notes?: string;
      sentAt?: Date;
    },
  ): Promise<InvitationRecipientEntity> {
    const updated = await this.prismaService.invitationRecipient.update({
      where: {
        id: recipientId,
      },
      data: {
        recipientName: data.name,
        phoneNumber: data.phoneNumber,
        notes: data.notes,
        sendAt: data.sentAt,
      },
    });

    return InvitationRecipientMapper.toEntity(updated);
  }

  async deleteRecipient(recipientId: number): Promise<void> {
    await this.prismaService.invitationRecipient.delete({
      where: {
        id: recipientId,
      },
    });
  }
}
