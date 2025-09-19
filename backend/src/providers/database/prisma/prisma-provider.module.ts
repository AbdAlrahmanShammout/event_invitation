import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma-provider.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaProviderModule {}
