import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@/authentication/auth.service';
import { UserEntity } from '@/modules/user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateLoginCredentials(username, password);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Please check your login credentials',
      });
    }

    return user;
  }
}
