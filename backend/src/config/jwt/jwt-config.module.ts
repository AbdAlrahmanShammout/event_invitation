import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { JwtConfigService } from './jwt-config.service';
import configuration from './jwt-configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      validationSchema: Joi.object({
        JWT_AUTH_TOKEN_SECRET_KEY: Joi.string().required(),
        JWT_AUTH_TOKEN_EXPIRES_IN: Joi.string().required(),
        // JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string().required(),
        // JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
        // JWT_INVITE_TOKEN_SECRET_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}
