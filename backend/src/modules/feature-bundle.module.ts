import { Module } from '@nestjs/common';

import { HallModule } from '@/modules/hall/hall.module';
import { InvitationModule } from '@/modules/invitation/invitation.module';
import { InvitationMessageModule } from '@/modules/invitation-message/invitation-message.module';
import { InvitationRecipientModule } from '@/modules/invitation-recipient/invitation-recipient.module';
import { UserModule } from '@/modules/user/user.module';
import { WhatsappSessionModule } from '@/modules/whatsapp-session/whatsapp-session.module';

@Module({
  imports: [
    HallModule,
    InvitationModule,
    InvitationMessageModule,
    InvitationRecipientModule,
    UserModule,
    WhatsappSessionModule,
  ],
})
export class FeatureBundleModule {}
