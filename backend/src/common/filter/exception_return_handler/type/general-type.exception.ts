import { AppException } from '@/common/exceptions/app.exception';

export interface IGeneralTypeException {
  message: string;
  code?: string;
  statusCode?: number;
  stack?: string;
  userFriendly?: boolean;
}

export class GeneralTypeException extends AppException {
  stack?: string;

  constructor(data: IGeneralTypeException) {
    const { message, code, statusCode, stack, userFriendly } = data;

    super({
      message,
      userFriendly,
      code,
      statusCode,
    });
    this.stack = stack;
  }
}
