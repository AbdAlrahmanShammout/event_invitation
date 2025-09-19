import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import {
  GqlArgumentsHost,
  GqlContextType,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { Request } from 'express';
import { UserEntity } from '@/modules/user/entity/user.entity';

export function getRequestFromContext(context: ExecutionContext): Request {
  if (getRequestTypeFromContext(context) === RequestType.HTTP) {
    return context.switchToHttp().getRequest();
  } else {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

export function getRequestFromHost(host: ArgumentsHost): Request {
  if (getRequestTypeFromHost(host) === RequestType.HTTP) {
    return host.switchToHttp().getRequest();
  } else {
    const ctx = GqlArgumentsHost.create(host);
    return ctx.getContext().req;
  }
}

export function getRequestTypeFromHost(host: ArgumentsHost): RequestType {
  return host.getType<GqlContextType>();
}

export function getRequestTypeFromContext(
  context: ExecutionContext,
): RequestType {
  return context.getType<GqlContextType>();
}

export function getUserFromRequestUseContext(
  context: ExecutionContext,
): UserEntity {
  return <UserEntity>getRequestFromContext(context).user;
}

export function getUserFromRequestUseHost(host: ArgumentsHost): UserEntity {
  return <UserEntity>getRequestFromHost(host).user;
}

export function getRequestInfo(context: ArgumentsHost): RequestInfo {
  return new RequestInfo(context);
}

export class RequestType {
  static readonly GRAPHQL = 'graphql';
  static readonly HTTP = 'http';
  static readonly RPC = 'rpc';
  static readonly WEB_SOCKET = 'ws';
}

export class RequestInfo {
  private readonly context: ArgumentsHost;
  private readonly request: Request;

  constructor(context: ArgumentsHost) {
    this.context = context;
    this.request = getRequestFromHost(context);
  }

  getIp(): string {
    return this.request['ip'];
  }

  getUserAgent(): string | string[] {
    return this.request.headers['UserEntity-agent'];
  }
}
