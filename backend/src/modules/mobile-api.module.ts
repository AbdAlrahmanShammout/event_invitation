import { Module } from '@nestjs/common';

import { MobileAuthGuard } from '@/common/guards/mobile-auth.guard';
import { InvitationMobileController } from '@/modules/invitation/invitation.mobile.controller';
import { InvitationModule } from '@/modules/invitation/invitation.module';
import { InvitationMessageModule } from '@/modules/invitation-message/invitation-message.module';
import { InvitationRecipientModule } from '@/modules/invitation-recipient/invitation-recipient.module';

@Module({
  imports: [InvitationModule, InvitationMessageModule, InvitationRecipientModule],
  controllers: [InvitationMobileController],
  providers: [MobileAuthGuard],
})
export class MobileApiModule {}
