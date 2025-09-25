import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtInvalidException } from '@/providers/jwt/exceptions/jwt-invalid.exception';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createJwtToken<T extends string | Buffer | object>(
    payload: T,
    secretOrOptions?:
      | string
      | {
          secret?: string;
          expiresIn?: number | string;
          issuer?: string;
          audience?: string;
        },
    expiresIn?: number | string,
  ) {
    // Backward compatibility: handle old signature (payload, secret, expiresIn)
    if (typeof secretOrOptions === 'string') {
      return this.jwtService.sign(payload as string, {
        secret: secretOrOptions,
        ...(expiresIn && { expiresIn }),
      });
    }

    // New signature: (payload, options)
    const options = secretOrOptions || {};
    return this.jwtService.sign(payload as string, {
      ...(options.secret && { secret: options.secret }),
      ...(options.expiresIn && { expiresIn: options.expiresIn }),
      ...(options.issuer && { issuer: options.issuer }),
      ...(options.audience && { audience: options.audience }),
    });
  }

  async verifyJWTToken<T extends object = any>(
    token: string,
    secretOrOptions?:
      | string
      | {
          secret?: string;
          issuer?: string;
          audience?: string;
        },
  ) {
    try {
      // Backward compatibility: handle old signature (token, secret)
      if (typeof secretOrOptions === 'string') {
        return this.jwtService.verify<T>(token, { secret: secretOrOptions });
      }

      // New signature: (token, options)
      const options = secretOrOptions || {};
      return this.jwtService.verify<T>(token, {
        ...(options.secret && { secret: options.secret }),
        ...(options.issuer && { issuer: options.issuer }),
        ...(options.audience && { audience: options.audience }),
      });
    } catch (error) {
      throw new JwtInvalidException(error.name == 'TokenExpiredError');
    }
  }
}
