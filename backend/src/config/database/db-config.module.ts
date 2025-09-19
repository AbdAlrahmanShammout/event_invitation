import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { DBConfigService } from './db-config.service';
import configurations from './db-configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configurations,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, DBConfigService],
  exports: [ConfigService, DBConfigService],
})
export class DBConfigModule {}
