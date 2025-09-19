import { AppException } from '@/common/exceptions/app.exception';
import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { mapAxiosErrorException } from '@/common/filter/exception_mappers/axios-error-handler';
// Updated function names for better clarity

function tryMapSpecialExceptions(exception: any): GeneralTypeException | null {
  return (
    // mapSequelizeException(exception) ||
    // mapCaslForbiddenException(exception) ||
    // mapApolloErrorException(exception) ||
    mapAxiosErrorException(exception) ||
    null
  );
}

export function normalizeException(
  exception: any,
): GeneralTypeException {
  const customMappedError = tryMapSpecialExceptions(exception);
  if (customMappedError) return customMappedError;

  console.log(exception.constructor.name);
  if (exception instanceof AppException) {
    return new GeneralTypeException({
      message: exception.message,
      code: exception.code,
      statusCode: exception.statusCode,
      stack: exception.stack,
      userFriendly: exception.userFriendly,
    });
  } else if (exception instanceof NotFoundException) {
    return new GeneralTypeException({
      message: exception.message,
      code: exception.name,
      statusCode: HttpStatus.NOT_FOUND,
      stack: exception.stack,
      userFriendly: true,
    });
  } else if (exception instanceof ZodError) {
    return new GeneralTypeException({
      message: exception.issues.map((i) => `${i.path}: ${i.message}`).join(','),
      code: exception.name,
      statusCode: HttpStatus.BAD_REQUEST,
      stack: exception.stack,
    });
  } else if (exception instanceof UnauthorizedException) {
    return new GeneralTypeException({
      message: exception.message,
      code: exception.name,
      statusCode: HttpStatus.UNAUTHORIZED,
      userFriendly: true,
    });
  } else if (exception instanceof TypeError) {
    return new GeneralTypeException({
      message: exception.message,
      code: exception.name,
      statusCode: HttpStatus.BAD_REQUEST,
      stack: exception.stack,
    });
  } else if (exception instanceof HttpException) {
    return new GeneralTypeException({
      message: exception.message,
      code: exception.name,
      statusCode: exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
      stack: exception.stack,
    });
  }
  // Uncomment and extend for additional exception handling
  // else if (exception instanceof DatabaseError || exception instanceof UniqueConstraintError) {
  //   const message = `${exception.message} => ${exception.parent}`;
  //   return new GeneralTypeException({
  //     message: exception instanceof UniqueConstraintError
  //       ? `${message} and sql: ${exception.sql} and fields: ${Object.keys(exception.fields)}, values: ${Object.values(exception.fields)}`
  //       : message,
  //     code: exception.name,
  //     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //     stack: exception.stack,
  //   });
  // }
  // else if (exception instanceof ForbiddenError) {
  //   return new GeneralTypeException({
  //     message: 'forbidden',
  //     code: 'FORBIDDEN',
  //     statusCode: HttpStatus.FORBIDDEN,
  //     userFriendly: true,
  //   });
  // }

  return new GeneralTypeException({
    message: exception.message || 'Unknown Error',
    code: 'INTERNAL_SERVER_ERROR',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    stack: exception.stack,
  });
}

