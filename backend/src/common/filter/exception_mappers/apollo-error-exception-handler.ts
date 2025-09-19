// import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';
// import { HttpStatus } from '@nestjs/common';
// import { ApolloError } from 'apollo-server-express';
//
// export function mapApolloErrorException(
//   exception: any,
// ): GeneralTypeException | null {
//   if (exception instanceof ApolloError) {
//     return new GeneralTypeException({
//       message: exception.message,
//       code: exception.extensions.code,
//       statusCode: HttpStatus.BAD_REQUEST,
//       stack: exception.stack,
//     });
//   }
//   return null;
// }
