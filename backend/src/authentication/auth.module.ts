import { Module } from '@nestjs/common';
import { AuthService } from '@/authentication/auth.service';
import { JwtAuthStrategy } from '@/authentication/strategies/jwt-auth.strategy';
import { UserModule } from '@/modules/user/user.module';
import { LocalStrategy } from '@/authentication/strategies/local.strategy';
import { AuthController } from '@/authentication/auth.controller';
import { ForgetPasswordController } from '@/authentication/forget-password.controller';
import { ForgetPasswordService } from '@/authentication/forget-password.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController, ForgetPasswordController],
  providers: [AuthService, ForgetPasswordService, JwtAuthStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
