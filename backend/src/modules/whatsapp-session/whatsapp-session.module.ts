import { Module } from '@nestjs/common';
import { WhatsappSessionController } from './whatsapp-session.controller';
import { WhatsappSessionService } from './whatsapp-session.service';
import { WhatsAppProviderModule } from '@/providers/whatsapp/whatsapp-provider.module';
import { WhatsAppSessionRepository } from './repository/whatsapp-session.repository';
import { WhatsAppSessionPrismaRepository } from './repository/whatsapp-session-prisma.repository';

@Module({
  imports: [WhatsAppProviderModule],
  controllers: [WhatsappSessionController],
  providers: [
    WhatsappSessionService,
    {
      provide: WhatsAppSessionRepository,
      useClass: WhatsAppSessionPrismaRepository,
    },
  ],
  exports: [WhatsappSessionService],
})
export class WhatsappSessionModule {}
