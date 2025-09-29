import { Module } from '@nestjs/common';
import { InvitationMessageService } from './invitation-message.service';
import { InvitationMessagePrismaRepository } from './repository/invitation-message-prisma.repository';
import { InvitationModule } from '../invitation/invitation.module';
import { InvitationMessageRepository } from '@/modules/invitation-message/repository/invitation-message.repository';

@Module({
  imports: [InvitationModule],
  providers: [
    InvitationMessageService,
    {
      provide: InvitationMessageRepository,
      useClass: InvitationMessagePrismaRepository,
    },
  ],
  exports: [InvitationMessageService],
})
export class InvitationMessageModule {}
