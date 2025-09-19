import { HttpStatus } from '@nestjs/common';

export interface IAppException {
  message?: string;
  code?: string;
  statusCode?: HttpStatus;
  userFriendly?: boolean;
}

export class AppException extends Error {
  code: string;
  statusCode: number;
  userFriendly: boolean;

  constructor(data: IAppException) {
    const {
      message,
      code,
      statusCode = HttpStatus.BAD_REQUEST,
      userFriendly,
    } = data;
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.userFriendly = userFriendly ?? false;
    // Error.captureStackTrace(this);
  }
}
