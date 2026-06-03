import { Module } from '@nestjs/common';

import { AuthModule } from '@/authentication/auth.module';
import { HallOperationGuard } from '@/common/guards/hall-operation.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { HallController } from '@/modules/hall/hall.controller';
import { HallModule } from '@/modules/hall/hall.module';
import { InvitationController } from '@/modules/invitation/invitation.controller';
import { InvitationModule } from '@/modules/invitation/invitation.module';
import { InvitationRecipientModule } from '@/modules/invitation-recipient/invitation-recipient.module';
import { WhatsappSessionModule } from '@/modules/whatsapp-session/whatsapp-session.module';
import { WhatsappSessionController } from '@/modules/whatsapp-session/whatsapp-session.controller';

@Module({
  imports: [
    AuthModule,
    HallModule,
    InvitationModule,
    InvitationRecipientModule,
    WhatsappSessionModule,
  ],
  controllers: [HallController, InvitationController, WhatsappSessionController],
  providers: [HallOperationGuard, JwtAuthGuard],
})
export class HallManagerApiModule {}
