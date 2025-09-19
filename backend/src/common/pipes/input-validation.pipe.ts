import { HttpStatus, Injectable, ValidationError, ValidationPipe } from '@nestjs/common';

import {
  ValidationErrorObject,
  ValidationExceptions,
} from '@/common/exceptions/validation.exception';

@Injectable()
export class InputValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const validationErrorsAfterParsed = InputValidationPipe.getFactoryErrors(validationErrors);

        return new ValidationExceptions({
          message: 'Invalid input',
          code: 'BAD_USER_INPUT',
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          validationErrorObjects: validationErrorsAfterParsed,
        });
      },
    });
  }

  static getFactoryErrors(validationErrors: ValidationError[], parentProperty = '') {
    const parsedErrors: ValidationErrorObject[] = [];
    for (const validationError of validationErrors) {
      if (validationError.constraints) {
        parsedErrors.push({
          property: `${parentProperty}${validationError.property}`,
          validationErrors: Object.values(validationError.constraints),
        });
      } else if (validationError.children && validationError.children.length > 0) {
        parsedErrors.push(
          ...this.getFactoryErrors(validationError.children, `${validationError.property}.`),
        );
      }
    }

    return parsedErrors;
  }
}
