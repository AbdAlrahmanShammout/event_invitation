import { Module } from '@nestjs/common';

import { AdminMonitoringService } from '@/modules/admin-monitoring/admin-monitoring.service';
import { DatabaseProviderModule } from '@/providers/database/database-provider.module';

@Module({
  imports: [DatabaseProviderModule],
  providers: [AdminMonitoringService],
  exports: [AdminMonitoringService],
})
export class AdminMonitoringModule {}
