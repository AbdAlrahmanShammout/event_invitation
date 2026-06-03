import { Module } from '@nestjs/common';

import { AdminApiModule } from '@/modules/admin-api.module';
import { HallManagerApiModule } from '@/modules/hall-manager-api.module';
import { MobileApiModule } from '@/modules/mobile-api.module';

@Module({
  imports: [AdminApiModule, HallManagerApiModule, MobileApiModule],
})
export class FeatureBundleModule {}
