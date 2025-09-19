import { Catch, ExecutionContext, NotImplementedException } from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';

import { graphqlExceptionHandler } from '@/common/filter/exception_return_handler/graphql_exception.handler';
import { httpExceptionHandler } from '@/common/filter/exception_return_handler/http_exception.handler';

import { ValidationExceptions } from '../exceptions/validation.exception';
import { getRequestTypeFromHost, RequestType } from '../helpers/request.helper';

@Catch(ValidationExceptions)
export class ValidationExceptionFilter implements ExternalExceptionFilter {
  async catch(exception: ValidationExceptions, host: ExecutionContext): Promise<any> {
    switch (getRequestTypeFromHost(host)) {
      case RequestType.HTTP:
        return httpExceptionHandler(exception, host);
      case RequestType.GRAPHQL:
        return graphqlExceptionHandler(exception, host);
    }
    throw new NotImplementedException('Unable to identify ReqUser destination');
  }
}
