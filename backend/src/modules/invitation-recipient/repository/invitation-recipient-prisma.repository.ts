import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { InvitationRecipientMapper } from '@/modules/invitation-recipient/mapper/invitation-recipient.mapper';
import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';
import {
  CreateMobileRecipientsInput,
  DeliverySummary,
  FindRecipientsInput,
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

  async findRecipients(input: FindRecipientsInput): Promise<InvitationRecipientEntity[]> {
    const where: Prisma.InvitationRecipientWhereInput = {};
    if (input.invitationId) where.invitationId = input.invitationId;
    if (input.hallId) where.invitation = { hallId: input.hallId };
    if (input.messageStatus) where.messageStatus = input.messageStatus;
    if (input.sentAtFrom || input.sentAtTo) {
      where.sentAt = {};
      if (input.sentAtFrom) where.sentAt.gte = input.sentAtFrom;
      if (input.sentAtTo) where.sentAt.lte = input.sentAtTo;
    }
    if (input.sendAtFrom || input.sendAtTo) {
      where.sendAt = {};
      if (input.sendAtFrom) where.sendAt.gte = input.sendAtFrom;
      if (input.sendAtTo) where.sendAt.lte = input.sendAtTo;
    }
    const results = await this.prismaService.invitationRecipient.findMany({
      where,
      take: input.limit ?? 50,
      skip: input.offset ?? 0,
      orderBy: { submittedAt: 'desc' },
    });
    return results.map((r) => InvitationRecipientMapper.toEntity(r));
  }

  async getDeliverySummary(invitationId: number): Promise<DeliverySummary> {
    const groups = await this.prismaService.invitationRecipient.groupBy({
      by: ['messageStatus'],
      where: { invitationId },
      _count: true,
    });
    const summary: DeliverySummary = {
      holding: 0,
      pending: 0,
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0,
      total: 0,
    };
    for (const group of groups) {
      const status = group.messageStatus as MessageStatus;
      const count = group._count;
      summary.total += count;
      if (status === MessageStatus.HOLDING) summary.holding = count;
      else if (status === MessageStatus.PENDING) summary.pending = count;
      else if (status === MessageStatus.SENT) summary.sent = count;
      else if (status === MessageStatus.DELIVERED) summary.delivered = count;
      else if (status === MessageStatus.READ) summary.read = count;
      else if (status === MessageStatus.FAILED) summary.failed = count;
    }
    return summary;
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

  async linkRecipientsToMessage(input: {
    messageId: number;
    recipientIds: number[];
  }): Promise<void> {
    await this.prismaService.invitationRecipient.updateMany({
      where: {
        id: { in: input.recipientIds },
      },
      data: {
        invitationMessageId: input.messageId,
      },
    });
  }
}
