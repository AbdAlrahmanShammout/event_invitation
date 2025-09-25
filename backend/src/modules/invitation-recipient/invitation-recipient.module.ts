import { Module } from '@nestjs/common';

import { InvitationRecipientController } from '@/modules/invitation-recipient/invitation-recipient.controller';
import { InvitationRecipientService } from '@/modules/invitation-recipient/invitation-recipient.service';
import { InvitationRecipientRepository } from '@/modules/invitation-recipient/repository/invitation-recipient.repository';
import { InvitationRecipientPrismaRepository } from '@/modules/invitation-recipient/repository/invitation-recipient-prisma.repository';
import { DatabaseProviderModule } from '@/providers/database/database-provider.module';
import { InvitationModule } from '@/modules/invitation/invitation.module';
import { MobileModule } from '@/modules/mobile/mobile.module';

@Module({
  imports: [DatabaseProviderModule, InvitationModule, MobileModule],
  controllers: [InvitationRecipientController],
  providers: [
    InvitationRecipientService,
    {
      provide: InvitationRecipientRepository,
      useClass: InvitationRecipientPrismaRepository,
    },
  ],
  exports: [InvitationRecipientService, InvitationRecipientRepository],
})
export class InvitationRecipientModule {}
