import { Module } from '@nestjs/common';
import { WhatsAppManagerService } from './whatsapp-manager.service';

@Module({
  providers: [WhatsAppManagerService],
  exports: [WhatsAppManagerService],
})
export class WhatsAppProviderModule {}
