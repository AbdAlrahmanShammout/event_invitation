import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './app/app-config.module';
import { DBConfigModule } from './database/db-config.module';
import { JwtConfigModule } from './jwt/jwt-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    DBConfigModule,
    JwtConfigModule,
    AppConfigModule,
  ],
})
export class ConfigsModule {}
