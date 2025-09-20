import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfigService } from '@/config/jwt/jwt-config.service';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserService } from '@/modules/user/user.service';
// import { setUserPreferences } from '@/common/cls/set-metadata';
import { JwtAuthTokenPayload } from '@/authentication/types/jwt-auth-token-payload.type';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    jwtConfigService: JwtConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigService.jwtAuthTokenSecretKey,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtAuthTokenPayload): Promise<UserEntity> {
    const { userId } = payload;
    const user = await this.usersService.findUserById(userId);

    // // This will create a custom execution context to store the user preferences
    // setUserPreferences(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
