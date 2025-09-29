import { Module } from '@nestjs/common';

import { InvitationController } from '@/modules/invitation/invitation.controller';
import { InvitationMobileController } from '@/modules/invitation/invitation.mobile.controller';
import { InvitationService } from '@/modules/invitation/invitation.service';
import { InvitationRepository } from '@/modules/invitation/repository/invitation.repository';
import { InvitationPrismaRepository } from '@/modules/invitation/repository/invitation-prisma.repository';
import { DatabaseProviderModule } from '@/providers/database/database-provider.module';

@Module({
  imports: [DatabaseProviderModule],
  controllers: [InvitationController, InvitationMobileController],
  providers: [
    InvitationService,
    {
      provide: InvitationRepository,
      useClass: InvitationPrismaRepository,
    },
  ],
  exports: [InvitationService, InvitationRepository],
})
export class InvitationModule {}
