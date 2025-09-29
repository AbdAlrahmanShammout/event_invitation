import { Injectable } from '@nestjs/common';

import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationMessageMapper } from '@/modules/invitation-message/mapper/invitation-message.mapper';
import { InvitationMessageRepository } from '@/modules/invitation-message/repository/invitation-message.repository';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';
import { 
  CreateInvitationMessageRepoInput,
  UpdateInvitationMessageRepoInput,
} from '@/modules/invitation-message/defs/invitation-message-repository.defs';

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
