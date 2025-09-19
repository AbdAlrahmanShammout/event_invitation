import { ArgumentsHost } from '@nestjs/common';
import { AppException } from '@/common/exceptions/app.exception';

export function httpExceptionHandler(
  exception: AppException,
  host: ArgumentsHost,
) {
  const response = host.switchToHttp().getRequest().res;
  return response.status(exception.statusCode).json({
    message: exception.message,
    code: exception.code,
    statusCode: exception.statusCode,
    stack: exception.stack,
  });
}
