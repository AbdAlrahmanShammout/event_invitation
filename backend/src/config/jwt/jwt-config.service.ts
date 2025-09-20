import { Injectable } from '@nestjs/common';

import { BaseConfigService } from '@/config/base-config.service';

@Injectable()
export class JwtConfigService extends BaseConfigService {
  get jwtAuthTokenSecretKey(): string {
    return this.getValue<string>('jwt.auth-token.jwtAuthTokenSecretKey');
  }

  get jwtAuthTokenExpiresIn(): string {
    return this.getValue<string>('jwt.auth-token.jwtAuthTokenExpiresIn');
  }

  get jwtResetPasswordTokenSecretKey(): string {
    return this.getValue<string>('jwt.auth-token.jwtResetPasswordTokenSecretKey');
  }

  get jwtResetPasswordTokenExpiresIn(): string {
    return this.getValue<string>('jwt.auth-token.jwtResetPasswordTokenExpiresIn');
  }

  //
  // get jwtRefreshTokenSecretKey(): string {
  //   return this.getValue<string>('jwt.refresh-token.jwtRefreshTokenSecretKey');
  // }
  //
  // get jwtRefreshTokenExpiresIn(): string {
  //   return this.getValue<string>('jwt.refresh-token.jwtRefreshTokenExpiresIn');
  // }
  //
  // get jwtInviteTokenSecretKey(): string {
  //   return this.getValue<string>('jwt.invite-token.jwtInviteTokenSecretKey');
  // }
}
