import { Module } from '@nestjs/common';

import { HallModule } from '@/modules/hall/hall.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [HallModule, UserModule],
})
export class FeatureBundleModule {}
