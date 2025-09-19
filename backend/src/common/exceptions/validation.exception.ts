import { AppException } from '@/common/exceptions/app.exception';

export interface IValidationExceptions {
  message: string;
  code: string;
  statusCode: number;
  validationErrorObjects: ValidationErrorObject[];
}

export class ValidationExceptions extends AppException {
  validationErrorObjects: ValidationErrorObject[];

  constructor(data: IValidationExceptions) {
    super({ ...data, userFriendly: true });
    this.validationErrorObjects = data.validationErrorObjects;
  }
}

export class ValidationErrorObject {
  validationErrors: string[];
  property: string;
}
