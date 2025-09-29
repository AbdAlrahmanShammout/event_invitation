import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';
import { WhatsAppSessionRepository } from './whatsapp-session.repository';
import { UpdateSessionStatusRepoInput } from '@/modules/whatsapp-session/defs/whatsapp-session-repository.defs';

@Injectable()
export class WhatsAppSessionPrismaRepository implements WhatsAppSessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(hallId: number, sessionId: string): Promise<void> {
    await this.prismaService.whatsAppSession.upsert({
      where: { hallId },
      create: {
        hallId,
        sessionId,
        isActive: false,
      },
      update: {
        sessionId,
        isActive: false,
      },
    });
  }

  async updateQrCode(hallId: number, qrCode: string): Promise<void> {
    await this.prismaService.whatsAppSession.upsert({
      where: { hallId },
      create: {
        hallId,
        sessionId: `hall_${hallId}`,
        isActive: false,
        qrCode,
      },
      update: {
        qrCode,
      },
    });
  }

  async updateSessionStatus(hallId: number, data: UpdateSessionStatusRepoInput): Promise<void> {
    await this.prismaService.whatsAppSession.update({
      where: { hallId },
      data,
    });
  }

  async getQrCode(hallId: number): Promise<string | null> {
    const session = await this.prismaService.whatsAppSession.findUnique({
      where: { hallId },
      select: { qrCode: true },
    });

    return session?.qrCode || null;
  }

  async findByHallId(hallId: number) {
    return await this.prismaService.whatsAppSession.findUnique({
      where: { hallId },
      include: { hall: true },
    });
  }

  async getActiveSessionsForInitialization(): Promise<{ hallId: number; sessionId: string }[]> {
    const sessions = await this.prismaService.whatsAppSession.findMany({
      where: { isActive: true },
      select: { hallId: true, sessionId: true },
    });

    return sessions;
  }
}
