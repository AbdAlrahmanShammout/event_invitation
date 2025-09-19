import { ArgumentsHost } from '@nestjs/common';

// import { GraphQLError } from 'graphql/index';
import { AppException } from '@/common/exceptions/app.exception';
import { ValidationExceptions } from '@/common/exceptions/validation.exception';

export function graphqlExceptionHandler(exception: AppException, host: ArgumentsHost) {
  // throw new GraphQLError(exception.message, {
  //   extensions: {
  //     message: exception.message,
  //     code: exception.code,
  //     statusCode: exception.statusCode,
  //     ...exception,
  //   },
  // });
}
