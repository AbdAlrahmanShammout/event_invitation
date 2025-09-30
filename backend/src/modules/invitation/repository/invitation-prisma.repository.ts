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
        maxGuestsAllowed: input.maxGuestsAllowed,
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

    if (input.status) {
      where.status = input.status;
    }

    // Date range filtering
    if (input.eventDateFrom || input.eventDateTo) {
      where.eventDate = {};

      if (input.eventDateFrom) {
        where.eventDate.gte = input.eventDateFrom;
      }

      if (input.eventDateTo) {
        where.eventDate.lte = input.eventDateTo;
      }
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
        eventDate: 'asc', // Order by event date ascending for better UX
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

    if (input.maxGuestsAllowed !== undefined) {
      updateData.maxGuestsAllowed = input.maxGuestsAllowed;
    }

    if (input.status !== undefined) {
      updateData.status = input.status;
    }

    if (input.startSendAt !== undefined) {
      updateData.startSendAt = input.startSendAt;
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
