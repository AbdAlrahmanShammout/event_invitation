// import { DatabaseError, UniqueConstraintError } from 'sequelize';
//
// import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';
// import { HttpStatus } from '@nestjs/common';
//
// export function mapSequelizeException(
//   exception: any,
// ): GeneralTypeException | null {
//   if (
//     exception instanceof DatabaseError ||
//     exception instanceof UniqueConstraintError
//   ) {
//     const message = `${exception.message} => ${exception.parent}`;
//
//     return new GeneralTypeException({
//       message:
//         exception instanceof UniqueConstraintError
//           ? `${message} and sql: ${exception.sql} and fields: ${Object.keys(exception.fields)}, values: ${Object.values(exception.fields)}`
//           : message,
//       code: exception.name,
//       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//       stack: exception.stack,
//     });
//   }
//   return null;
// }
