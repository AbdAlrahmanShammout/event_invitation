import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

export type PlatformOverview = {
  halls: {
    total: number;
    active: number;
    inactive: number;
    suspended: number;
  };
  invitations: {
    total: number;
    byStatus: Record<string, number>;
  };
  recipients: {
    total: number;
    byMessageStatus: Record<string, number>;
  };
  whatsappSessions: {
    total: number;
    active: number;
    inactive: number;
  };
};

export type PhoneNumberEntry = {
  phoneNumber: string;
  source: 'recipient' | 'hall' | 'whatsapp_session';
  associatedName?: string;
  hallId?: number;
  invitationId?: number;
};

export type GetPhoneNumbersInput = {
  hallId?: number;
  search?: string;
  limit?: number;
  offset?: number;
};

/**
 * Provides cross-domain platform-wide monitoring queries for super admins.
 */
@Injectable()
export class AdminMonitoringService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPlatformOverview(): Promise<PlatformOverview> {
    const [
      totalHalls,
      hallsByStatus,
      totalInvitations,
      invitationsByStatus,
      totalRecipients,
      recipientsByStatus,
      totalSessions,
      activeSessions,
    ] = await Promise.all([
      this.prismaService.hall.count(),
      this.prismaService.hall.groupBy({ by: ['status'], _count: true }),
      this.prismaService.invitation.count(),
      this.prismaService.invitation.groupBy({ by: ['status'], _count: true }),
      this.prismaService.invitationRecipient.count(),
      this.prismaService.invitationRecipient.groupBy({ by: ['messageStatus'], _count: true }),
      this.prismaService.whatsAppSession.count(),
      this.prismaService.whatsAppSession.count({ where: { isActive: true } }),
    ]);

    const hallsMap: Record<string, number> = { active: 0, inactive: 0, suspended: 0 };
    for (const row of hallsByStatus) {
      hallsMap[row.status] = row._count;
    }

    const invitationsMap: Record<string, number> = {};
    for (const row of invitationsByStatus) {
      invitationsMap[row.status] = row._count;
    }

    const recipientsMap: Record<string, number> = {};
    for (const row of recipientsByStatus) {
      recipientsMap[row.messageStatus] = row._count;
    }

    return {
      halls: {
        total: totalHalls,
        active: hallsMap['active'] ?? 0,
        inactive: hallsMap['inactive'] ?? 0,
        suspended: hallsMap['suspended'] ?? 0,
      },
      invitations: {
        total: totalInvitations,
        byStatus: invitationsMap,
      },
      recipients: {
        total: totalRecipients,
        byMessageStatus: recipientsMap,
      },
      whatsappSessions: {
        total: totalSessions,
        active: activeSessions,
        inactive: totalSessions - activeSessions,
      },
    };
  }

  async getPhoneNumbers(input: GetPhoneNumbersInput): Promise<PhoneNumberEntry[]> {
    const limit = input.limit ?? 50;
    const offset = input.offset ?? 0;

    const recipientWhere: any = {};
    if (input.hallId) recipientWhere.invitation = { hallId: input.hallId };
    if (input.search) recipientWhere.phoneNumber = { contains: input.search };

    const recipients = await this.prismaService.invitationRecipient.findMany({
      where: recipientWhere,
      select: {
        phoneNumber: true,
        recipientName: true,
        invitationId: true,
        invitation: { select: { hallId: true } },
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    return recipients.map((r) => ({
      phoneNumber: r.phoneNumber,
      source: 'recipient' as const,
      associatedName: r.recipientName,
      hallId: r.invitation?.hallId,
      invitationId: r.invitationId,
    }));
  }
}
