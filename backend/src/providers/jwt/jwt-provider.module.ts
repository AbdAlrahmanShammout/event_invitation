import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '@/config/jwt/jwt-config.module';
import { JwtConfigService } from '@/config/jwt/jwt-config.service';
import { JwtTokenService } from '@/providers/jwt/jwt-token.service';

@Module({
  exports: [JwtTokenService],
  providers: [JwtTokenService],
  imports: [
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: async (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.jwtAuthTokenSecretKey,
        signOptions: {
          expiresIn: jwtConfigService.jwtAuthTokenExpiresIn,
        },
      }),
    }),
  ],
})
export class JwtProviderModule {}
