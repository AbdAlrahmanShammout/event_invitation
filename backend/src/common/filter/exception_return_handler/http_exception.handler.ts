import { ArgumentsHost } from '@nestjs/common';

import { AppException } from '@/common/exceptions/app.exception';
import {
  ValidationErrorObject,
  ValidationExceptions,
} from '@/common/exceptions/validation.exception';

interface HttpExceptionResponseBody {
  message: string;
  code: string;
  statusCode: number;
  stack?: string;
  validationErrorObjects?: ValidationErrorObject[];
}

export function httpExceptionHandler(exception: AppException, host: ArgumentsHost): unknown {
  const response = host.switchToHttp().getRequest().res;
  const validationErrorObjects = getValidationErrorObjects(exception);
  const responseBody: HttpExceptionResponseBody = {
    message: exception.message,
    code: exception.code,
    statusCode: exception.statusCode,
    stack: exception.stack,
    ...(validationErrorObjects ? { validationErrorObjects } : {}),
  };
  return response.status(exception.statusCode).json(responseBody);
}

function getValidationErrorObjects(exception: AppException): ValidationErrorObject[] | undefined {
  if (!(exception instanceof ValidationExceptions)) {
    return undefined;
  }
  return exception.validationErrorObjects;
}
