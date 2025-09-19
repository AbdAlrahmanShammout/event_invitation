import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { AppConfigService } from '@/config/app/app-config.service';
import { EnvTypes } from '@/config/enviroment';
import { getRequestTypeFromHost, RequestType } from '../helpers/request.helper';
import { httpExceptionHandler } from '@/common/filter/exception_return_handler/http_exception.handler';
import { graphqlExceptionHandler } from '@/common/filter/exception_return_handler/graphql_exception.handler';
import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';
import { mapExceptionToGeneralType } from '@/common/filter/exception_mappers/exception-mapper';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly appConfigService: AppConfigService) {}

  catch(exception: any, host: ArgumentsHost): any {
    let generalTypeException = mapExceptionToGeneralType(exception);

    this.logException(generalTypeException);
    this.captureException(generalTypeException);

    if (!generalTypeException.userFriendly && this.isProduction()) {
      generalTypeException = this.getDefaultHttpException(generalTypeException);
    }

    return this.handleException(generalTypeException, host);
  }

  private logException(exception: GeneralTypeException) {
    console.error({
      ...exception,
      message: exception.message,
      stack: exception.stack,
    });
  }

  private captureException(exception: GeneralTypeException) {
    if (
      !exception.userFriendly &&
      this.appConfigService.env !== EnvTypes.LOCAL
    ) {
      Sentry.captureException(exception, { extra: exception as any });
    }
  }

  private isProduction(): boolean {
    return ![
      EnvTypes.LOCAL.toString(),
      EnvTypes.DEVELOPMENT.toString(),
    ].includes(this.appConfigService.env);
  }

  private getDefaultHttpException(
    exception: GeneralTypeException,
  ): GeneralTypeException {
    const isNotFoundOrForbidden =
      exception.statusCode === HttpStatus.FORBIDDEN ||
      exception.statusCode === HttpStatus.NOT_FOUND;

    return new GeneralTypeException({
      message: isNotFoundOrForbidden ? 'not found' : 'Internal server error',
      code: isNotFoundOrForbidden ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
      statusCode: isNotFoundOrForbidden
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  private handleException(
    exception: GeneralTypeException,
    host: ArgumentsHost,
  ): any {
    switch (getRequestTypeFromHost(host)) {
      case RequestType.HTTP:
        return httpExceptionHandler(exception, host);
      case RequestType.GRAPHQL:
        return graphqlExceptionHandler(exception, host);
    }
  }
}
