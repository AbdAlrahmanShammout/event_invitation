import { Module } from '@nestjs/common';

import { DatabaseProviderModule } from '@/providers/database/database-provider.module';
import { JwtProviderModule } from '@/providers/jwt/jwt-provider.module';
import { WhatsAppProviderModule } from '@/providers/whatsapp/whatsapp-provider.module';

@Module({
  imports: [DatabaseProviderModule, JwtProviderModule, WhatsAppProviderModule],
  exports: [WhatsAppProviderModule],
})
export class ProviderModule {}
