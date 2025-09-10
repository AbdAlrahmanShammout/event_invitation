import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppConfigService } from './app-config.service';
import configuration from './app-configs';
import { EnvTypes } from '@/config/enviroment';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      validationSchema: Joi.object({
        SERVER_PORT: Joi.number().default(8080),
        SERVER_URL: Joi.string().default('http://localhost'),
        CLIENT_URL: Joi.string().default('http://localhost:4200'),
        APP_ENV: Joi.string()
          .valid(...(Object.values(EnvTypes) as readonly EnvTypes[]))
          .default(EnvTypes.LOCAL),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
