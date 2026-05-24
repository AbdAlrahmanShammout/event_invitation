import { Module } from '@nestjs/common';

import { AdminMonitoringController } from '@/modules/admin-monitoring/admin-monitoring.controller';
import { AdminMonitoringService } from '@/modules/admin-monitoring/admin-monitoring.service';
import { DatabaseProviderModule } from '@/providers/database/database-provider.module';

@Module({
  imports: [DatabaseProviderModule],
  controllers: [AdminMonitoringController],
  providers: [AdminMonitoringService],
})
export class AdminMonitoringModule {}
