import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtInvalidException } from '@/providers/jwt/exceptions/jwt-invalid.exception';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createJwtToken<T extends string | Buffer | object>(
    payload: T,
    secret?: string,
    expiresIn?: number | string,
  ) {
    return this.jwtService.sign(payload as string, {
      ...(secret && { secret }),
      ...(expiresIn && { expiresIn }),
    });
  }

  async verifyJWTToken<T extends object = any>(token: string, secret?: string) {
    try {
      return this.jwtService.verify<T>(token, { secret });
    } catch (error) {
      throw new JwtInvalidException(error.name == 'TokenExpiredError');
    }
  }
}
