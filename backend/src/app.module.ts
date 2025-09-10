import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProviderModule } from '@/providers/provider.module';

@Module({
  imports: [ProviderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
