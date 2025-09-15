import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwaggerConfigService } from './swagger-config.service';

@Module({
  imports: [ConfigModule],
  providers: [SwaggerConfigService],
})
export class SwaggerConfigModule {}
