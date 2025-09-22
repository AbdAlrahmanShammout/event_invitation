import { Injectable } from '@nestjs/common';

import {
  CreateInvitationRepoInput,
  GetInvitationRepoInput,
  GetInvitationsRepoInput,
  UpdateInvitationRepoInput,
} from '@/modules/invitation/defs/invitation-repository.defs';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';
import { InvitationMapper } from '@/modules/invitation/mapper/invitation.mapper';
import { InvitationRepository } from '@/modules/invitation/repository/invitation.repository';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

@Injectable()
export class InvitationPrismaRepository implements InvitationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateInvitationRepoInput): Promise<InvitationEntity> {
    const result = await this.prismaService.invitation.create({
      data: {
        title: input.title,
        description: input.description,
        eventDate: input.eventDate,
        hallId: input.hallId,
        creatorId: input.creatorId,
      },
    });

    return InvitationMapper.toEntity(result);
  }

  async getById(input: GetInvitationRepoInput): Promise<InvitationEntity | null> {
    const result = await this.prismaService.invitation.findUnique({
      where: { id: input.id },
      include: {
        creator: input.includeCreator,
        messages: input.includeMessages,
        recipients: input.includeRecipients,
      },
    });

    if (!result) {
      return null;
    }

    return InvitationMapper.toEntity(result);
  }

  async getAll(input: GetInvitationsRepoInput): Promise<InvitationEntity[]> {
    const where: any = {
      hallId: input.hallId, // Always required - filter by hall
    };

    if (input.creatorId) {
      where.creatorId = input.creatorId;
    }

    const results = await this.prismaService.invitation.findMany({
      where,
      include: {
        creator: input.includeCreator,
        messages: input.includeMessages,
        recipients: input.includeRecipients,
      },
      take: input.limit,
      skip: input.offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return results.map((result) => InvitationMapper.toEntity(result));
  }

  async update(input: UpdateInvitationRepoInput): Promise<InvitationEntity> {
    const updateData: any = {};

    if (input.title !== undefined) {
      updateData.title = input.title;
    }

    if (input.description !== undefined) {
      updateData.description = input.description;
    }

    if (input.eventDate !== undefined) {
      updateData.eventDate = input.eventDate;
    }

    const result = await this.prismaService.invitation.update({
      where: { id: input.id },
      data: updateData,
    });

    return InvitationMapper.toEntity(result);
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.invitation.delete({
      where: { id },
    });
  }
}
