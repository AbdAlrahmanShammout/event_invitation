import { Module } from '@nestjs/common';

import { HallAdminController } from '@/modules/hall/hall.admin.controller';
import { HallController } from '@/modules/hall/hall.controller';
import { HallAccountService } from '@/modules/hall/hall-account.service';
import { HallService } from '@/modules/hall/hall.service';
import { HallPrismaReposiory } from '@/modules/hall/repository/hall-prisma.reposiory';
import { HallRepository } from '@/modules/hall/repository/hall.repository';
import { HallAccountPrismaRepository } from '@/modules/hall/repository/hall-account-prisma.repository';
import { HallAccountRepository } from '@/modules/hall/repository/hall-account.repository';
import { DatabaseProviderModule } from '@/providers/database/database-provider.module';
import { UserModule } from '@/modules/user/user.module';
import { WhatsappSessionModule } from '@/modules/whatsapp-session/whatsapp-session.module';

@Module({
  imports: [DatabaseProviderModule, UserModule, WhatsappSessionModule],
  controllers: [HallController, HallAdminController],
  providers: [
    HallService,
    HallAccountService,
    {
      provide: HallRepository,
      useClass: HallPrismaReposiory,
    },
    {
      provide: HallAccountRepository,
      useClass: HallAccountPrismaRepository,
    },
  ],
  exports: [HallService, HallAccountService],
})
export class HallModule {}
