import { Module } from '@nestjs/common';
import { PrismaProviderModule } from '@/providers/database/prisma/prisma-provider.module';

@Module({
  imports: [PrismaProviderModule],
})
export class DatabaseProviderModule {}
