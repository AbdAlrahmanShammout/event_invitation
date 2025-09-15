import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProviderModule } from '@/providers/provider.module';
import { FeatureBundleModule } from '@/modules/feature-bundle.module';
import {ConfigsModule} from "@/config/configs.module";

@Module({
  imports: [ConfigsModule, ProviderModule, FeatureBundleModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
