import { ArgumentsHost } from '@nestjs/common';

import { AppException } from '@/common/exceptions/app.exception';
import {
  ValidationErrorObject,
  ValidationExceptions,
} from '@/common/exceptions/validation.exception';

interface GraphqlExceptionExtensions {
  message: string;
  code: string;
  statusCode: number;
  stack?: string;
  validationErrorObjects?: ValidationErrorObject[];
}

interface GraphqlException extends Error {
  extensions: GraphqlExceptionExtensions;
}

interface GraphqlErrorConstructor {
  new (
    message: string,
    options: {
      extensions: GraphqlExceptionExtensions;
    },
  ): GraphqlException;
}

interface GraphqlModule {
  GraphQLError: GraphqlErrorConstructor;
}

export function graphqlExceptionHandler(exception: AppException, _host: ArgumentsHost): never {
  const extensions = getGraphqlExceptionExtensions(exception);
  throw createGraphqlException(exception.message, extensions);
}

function getGraphqlExceptionExtensions(exception: AppException): GraphqlExceptionExtensions {
  const validationErrorObjects = getValidationErrorObjects(exception);
  return {
    message: exception.message,
    code: exception.code,
    statusCode: exception.statusCode,
    stack: exception.stack,
    ...(validationErrorObjects ? { validationErrorObjects } : {}),
  };
}

function getValidationErrorObjects(exception: AppException): ValidationErrorObject[] | undefined {
  if (!(exception instanceof ValidationExceptions)) {
    return undefined;
  }
  return exception.validationErrorObjects;
}

function createGraphqlException(
  message: string,
  extensions: GraphqlExceptionExtensions,
): GraphqlException {
  const GraphQLError = getGraphqlErrorConstructor();
  if (GraphQLError) {
    return new GraphQLError(message, { extensions });
  }
  const error = new Error(message) as GraphqlException;
  error.extensions = extensions;
  return error;
}

function getGraphqlErrorConstructor(): GraphqlErrorConstructor | undefined {
  try {
    const graphqlModule = require('graphql') as GraphqlModule;
    return graphqlModule.GraphQLError;
  } catch (_error) {
    return undefined;
  }
}
