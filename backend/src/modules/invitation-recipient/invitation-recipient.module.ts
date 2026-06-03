import { Module } from '@nestjs/common';

import { InvitationRecipientService } from '@/modules/invitation-recipient/invitation-recipient.service';
import { InvitationRecipientRepository } from '@/modules/invitation-recipient/repository/invitation-recipient.repository';
import { InvitationRecipientPrismaRepository } from '@/modules/invitation-recipient/repository/invitation-recipient-prisma.repository';
import { DatabaseProviderModule } from '@/providers/database/database-provider.module';
import { InvitationMessageModule } from '@/modules/invitation-message/invitation-message.module';

@Module({
  imports: [DatabaseProviderModule, InvitationMessageModule],
  providers: [
    InvitationRecipientService,
    {
      provide: InvitationRecipientRepository,
      useClass: InvitationRecipientPrismaRepository,
    },
  ],
  exports: [InvitationRecipientService],
})
export class InvitationRecipientModule {}
