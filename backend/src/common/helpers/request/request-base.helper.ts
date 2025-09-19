import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from '@/modules/user/entity/user.entity';

/**
 * Base request helper that works without GraphQL dependencies
 * Use this when you don't need GraphQL support
 */

export class RequestType {
  static readonly HTTP = 'http';
  static readonly RPC = 'rpc';
  static readonly WEB_SOCKET = 'ws';
  // GraphQL type is defined in the GraphQL extension
}

/**
 * Get HTTP request from ExecutionContext (HTTP only)
 */
export function getHttpRequestFromContext(context: ExecutionContext): Request {
  return context.switchToHttp().getRequest();
}

/**
 * Get HTTP request from ArgumentsHost (HTTP only)
 */
export function getHttpRequestFromHost(host: ArgumentsHost): Request {
  return host.switchToHttp().getRequest();
}

/**
 * Get request type from ArgumentsHost
 */
export function getRequestTypeFromHost(host: ArgumentsHost): string {
  return host.getType();
}

/**
 * Get request type from ExecutionContext
 */
export function getRequestTypeFromContext(context: ExecutionContext): string {
  return context.getType();
}

/**
 * Get user from HTTP request using ExecutionContext
 */
export function getUserFromHttpRequestUseContext(
  context: ExecutionContext,
): UserEntity {
  return <UserEntity>getHttpRequestFromContext(context).user;
}

/**
 * Get user from HTTP request using ArgumentsHost
 */
export function getUserFromHttpRequestUseHost(host: ArgumentsHost): UserEntity {
  return <UserEntity>getHttpRequestFromHost(host).user;
}

/**
 * Get request info from ArgumentsHost
 */
export function getRequestInfo(context: ArgumentsHost): RequestInfo {
  return new RequestInfo(context);
}

/**
 * Request information helper class
 */
export class RequestInfo {
  private readonly context: ArgumentsHost;
  private readonly request: Request;

  constructor(context: ArgumentsHost) {
    this.context = context;
    this.request = this.getRequestFromHost(context);
  }

  /**
   * Get request from host - override this in GraphQL extension
   */
  protected getRequestFromHost(host: ArgumentsHost): Request {
    return getHttpRequestFromHost(host);
  }

  getIp(): string {
    return this.request['ip'] || this.request.ip || "unknown";
  }

  getUserAgent(): string | string[] {
    return this.request.headers['user-agent'] || "unknown";
  }

  getMethod(): string {
    return this.request.method;
  }

  getUrl(): string {
    return this.request.url;
  }

  getHeaders(): Record<string, any> {
    return this.request.headers;
  }

  getUser(): UserEntity | undefined {
    return this.request.user as UserEntity;
  }
}
