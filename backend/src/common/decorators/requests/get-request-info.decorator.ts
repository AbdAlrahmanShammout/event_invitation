import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequestInfo } from '@/common/helpers';

export const GetRequestInfo = createParamDecorator(
  (data: unknown, context: ExecutionContext): RequestDetails => {
    const requestInfo = getRequestInfo(context);

    const userAgent = requestInfo.getUserAgent();

    return {
      ip: requestInfo.getIp(),
      userAgent: Array.isArray(userAgent) ? userAgent.join(',') : userAgent.toString(),
    };
  },
);

export class RequestDetails {
  ip: string;
  userAgent: string;
}
