import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from '@/modules/user/entity/user.entity';

import {
  getHttpRequestFromContext,
  getHttpRequestFromHost,
  RequestInfo as BaseRequestInfo,
  RequestType as BaseRequestType,
} from './request-base.helper';

/**
 * GraphQL extension for request helper
 * This file can be imported even when GraphQL is not installed
 * GraphQL functions will fallback to HTTP-only behavior when GraphQL is unavailable
 */

// Optional GraphQL imports - only used if GraphQL is available
let GqlArgumentsHost: any;
let GqlContextType: any;
let GqlExecutionContext: any;
let hasGraphQL = false;

try {
  const graphqlModule = require('@nestjs/graphql');
  GqlArgumentsHost = graphqlModule.GqlArgumentsHost;
  GqlContextType = graphqlModule.GqlContextType;
  GqlExecutionContext = graphqlModule.GqlExecutionContext;
  hasGraphQL = true;
} catch (error) {
  // GraphQL not available, functions will fall back to HTTP-only
  hasGraphQL = false;
}

export class RequestType extends BaseRequestType {
  static readonly GRAPHQL = 'graphql';
}

/**
 * Get request from ExecutionContext (supports both HTTP and GraphQL when available)
 */
export function getRequestFromContext(context: ExecutionContext): Request {
  if (!hasGraphQL || getRequestTypeFromContext(context) === RequestType.HTTP) {
    return getHttpRequestFromContext(context);
  } else {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

/**
 * Get request from ArgumentsHost (supports both HTTP and GraphQL when available)
 */
export function getRequestFromHost(host: ArgumentsHost): Request {
  if (!hasGraphQL || getRequestTypeFromHost(host) === RequestType.HTTP) {
    return getHttpRequestFromHost(host);
  } else {
    const ctx = GqlArgumentsHost.create(host);
    return ctx.getContext().req;
  }
}

/**
 * Get request type from ArgumentsHost (with GraphQL support if available)
 */
export function getRequestTypeFromHost(host: ArgumentsHost): string {
  if (hasGraphQL) {
    return host.getType<typeof GqlContextType>();
  }
  return host.getType();
}

/**
 * Get request type from ExecutionContext (with GraphQL support if available)
 */
export function getRequestTypeFromContext(context: ExecutionContext): string {
  if (hasGraphQL) {
    return context.getType<typeof GqlContextType>();
  }
  return context.getType();
}

/**
 * Get user from request using ExecutionContext (supports both HTTP and GraphQL when available)
 */
export function getUserFromRequestUseContext(context: ExecutionContext): UserEntity {
  return <UserEntity>getRequestFromContext(context).user;
}

/**
 * Get user from request using ArgumentsHost (supports both HTTP and GraphQL when available)
 */
export function getUserFromRequestUseHost(host: ArgumentsHost): UserEntity {
  return <UserEntity>getRequestFromHost(host).user;
}

/**
 * Enhanced RequestInfo class with GraphQL support when available
 */
export class RequestInfo extends BaseRequestInfo {
  protected getRequestFromHost(host: ArgumentsHost): Request {
    return getRequestFromHost(host);
  }
}

/**
 * Get request info from ArgumentsHost (with GraphQL support when available)
 */
export function getRequestInfo(context: ArgumentsHost): RequestInfo {
  return new RequestInfo(context);
}

// Re-export everything from base helper for convenience
export * from './request-base.helper';
