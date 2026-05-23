import { Injectable } from '@nestjs/common';

import {
  CreateInvitationMessageRepoInput,
  UpdateInvitationMessageRepoInput,
} from '@/modules/invitation-message/defs/invitation-message-repository.defs';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationMessageMapper } from '@/modules/invitation-message/mapper/invitation-message.mapper';
import { InvitationMessageRepository } from '@/modules/invitation-message/repository/invitation-message.repository';
import { invitationMessageDetailsInclude } from '@/modules/invitation-message/types/invitation-message-details.include';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

@Injectable()
export class InvitationMessagePrismaRepository implements InvitationMessageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateInvitationMessageRepoInput): Promise<InvitationMessageEntity> {
    const message = await this.prismaService.invitationMessage.create({
      data: {
        content: input.content,
        invitationId: input.invitationId,
      },
    });

    return InvitationMessageMapper.toEntity(message);
  }

  async findByInvitationId(invitationId: number): Promise<InvitationMessageEntity[]> {
    const messages = await this.prismaService.invitationMessage.findMany({
      where: { invitationId },
      include: invitationMessageDetailsInclude,
      orderBy: { createdAt: 'desc' },
    });

    return messages.map((message) => InvitationMessageMapper.toEntity(message));
  }

  async getMessagesCountByInvitation(invitationId: number): Promise<number> {
    return await this.prismaService.invitationMessage.count({
      where: {
        invitationId,
      },
    });
  }

  async findById(id: number): Promise<InvitationMessageEntity | null> {
    const message = await this.prismaService.invitationMessage.findUnique({
      where: { id },
      include: invitationMessageDetailsInclude,
    });

    return message ? InvitationMessageMapper.toEntity(message) : null;
  }

  async update(id: number, input: UpdateInvitationMessageRepoInput): Promise<InvitationMessageEntity> {
    const message = await this.prismaService.invitationMessage.update({
      where: { id },
      data: {
        content: input.content,
      },
    });

    return InvitationMessageMapper.toEntity(message);
  }

  async deleteMessage(id: number): Promise<void> {
    await this.prismaService.invitationMessage.delete({
      where: { id },
    });
  }
}
