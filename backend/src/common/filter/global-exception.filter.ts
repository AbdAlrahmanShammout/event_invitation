import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { normalizeException } from '@/common/filter/exception_mappers/exception-mapper';
import { graphqlExceptionHandler } from '@/common/filter/exception_return_handler/graphql_exception.handler';
import { httpExceptionHandler } from '@/common/filter/exception_return_handler/http_exception.handler';
import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';
import { AppConfigService } from '@/config/app/app-config.service';
import { EnvTypes } from '@/config/enviroment';

import { getRequestTypeFromHost, RequestType } from '../helpers/request.helper';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly appConfigService: AppConfigService) {}

  catch(exception: any, host: ArgumentsHost): any {
    let normalizedError = normalizeException(exception);

    this.logError(normalizedError);
    this.reportErrorToSentry(normalizedError);

    if (!normalizedError.userFriendly && this.shouldHideErrorDetails()) {
      normalizedError = this.createSafeProductionError(normalizedError);
    }

    return this.formatErrorResponse(normalizedError, host);
  }

  private logError(exception: GeneralTypeException) {
    console.error({
      ...exception,
      message: exception.message,
      stack: exception.stack,
    });
  }

  private reportErrorToSentry(exception: GeneralTypeException) {
    if (!exception.userFriendly && this.appConfigService.env !== EnvTypes.LOCAL) {
      Sentry.captureException(exception, { extra: exception as any });
    }
  }

  private shouldHideErrorDetails(): boolean {
    return ![EnvTypes.LOCAL.toString(), EnvTypes.DEVELOPMENT.toString()].includes(
      this.appConfigService.env,
    );
  }

  private createSafeProductionError(exception: GeneralTypeException): GeneralTypeException {
    const isClientSideError =
      exception.statusCode === HttpStatus.FORBIDDEN ||
      exception.statusCode === HttpStatus.NOT_FOUND;

    return new GeneralTypeException({
      message: isClientSideError ? 'not found' : 'Internal server error',
      code: isClientSideError ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
      statusCode: isClientSideError ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  private formatErrorResponse(exception: GeneralTypeException, host: ArgumentsHost): any {
    switch (getRequestTypeFromHost(host)) {
      case RequestType.HTTP:
        return httpExceptionHandler(exception, host);
      case RequestType.GRAPHQL:
        return graphqlExceptionHandler(exception, host);
    }
  }
}
