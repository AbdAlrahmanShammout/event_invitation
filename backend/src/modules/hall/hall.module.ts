import { Module } from '@nestjs/common';

import { HallController } from '@/modules/hall/hall.controller';
import { HallService } from '@/modules/hall/hall.service';
import { HallRepository } from '@/modules/hall/repository/hall.repository';
import { HallPrismaReposiory } from '@/modules/hall/repository/hall-prisma.reposiory';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [HallController],
  providers: [
    HallService,
    {
      provide: HallRepository,
      useClass: HallPrismaReposiory,
    },
  ],
})
export class HallModule {}
