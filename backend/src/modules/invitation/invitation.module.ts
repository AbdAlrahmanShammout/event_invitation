import { Module } from '@nestjs/common';

import { InvitationController } from '@/modules/invitation/invitation.controller';
import { InvitationMobileController } from '@/modules/invitation/invitation.mobile.controller';
import { InvitationService } from '@/modules/invitation/invitation.service';
import { InvitationRepository } from '@/modules/invitation/repository/invitation.repository';
import { InvitationPrismaRepository } from '@/modules/invitation/repository/invitation-prisma.repository';
import { DatabaseProviderModule } from '@/providers/database/database-provider.module';
import { HallModule } from '@/modules/hall/hall.module';
import { InvitationRecipientModule } from '@/modules/invitation-recipient/invitation-recipient.module';
import { MobileTokenService } from '@/modules/invitation/mobile-token.service';
import { InvitationMessageModule } from '@/modules/invitation-message/invitation-message.module';

@Module({
  imports: [DatabaseProviderModule, HallModule, InvitationRecipientModule, InvitationMessageModule],
  controllers: [InvitationController, InvitationMobileController],
  providers: [
    MobileTokenService,
    InvitationService,
    {
      provide: InvitationRepository,
      useClass: InvitationPrismaRepository,
    },
  ],
  exports: [InvitationService, InvitationRepository],
})
export class InvitationModule {}
