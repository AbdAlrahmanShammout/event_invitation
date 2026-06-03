import { Module } from '@nestjs/common';

import { AuthModule } from '@/authentication/auth.module';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { AdminMonitoringController } from '@/modules/admin-monitoring/admin-monitoring.controller';
import { AdminMonitoringModule } from '@/modules/admin-monitoring/admin-monitoring.module';
import { HallAdminController } from '@/modules/hall/hall.admin.controller';
import { HallModule } from '@/modules/hall/hall.module';
import { InvitationAdminController } from '@/modules/invitation/invitation.admin.controller';
import { InvitationModule } from '@/modules/invitation/invitation.module';
import { UserAdminController } from '@/modules/user/user.admin.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [AuthModule, AdminMonitoringModule, HallModule, InvitationModule, UserModule],
  controllers: [
    AdminMonitoringController,
    HallAdminController,
    InvitationAdminController,
    UserAdminController,
  ],
  providers: [JwtAuthGuard, RolesGuard],
})
export class AdminApiModule {}
