import { Module } from '@nestjs/common';
import { PrismaService } from '@/providers/database/prisma/prisma-provider.service';

@Module({
  providers: [PrismaService],
})
export class PrismaProviderModule {}
