import { HttpStatus } from '@nestjs/common';
import { AppException } from '@/common/exceptions/app.exception';

export class JwtInvalidException extends AppException {
  constructor(isExpired = false) {
    super({
      message: `The request token has ${isExpired ? 'expired' : 'invalid'}`,
      code: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
      userFriendly: true,
    });
  }
}
