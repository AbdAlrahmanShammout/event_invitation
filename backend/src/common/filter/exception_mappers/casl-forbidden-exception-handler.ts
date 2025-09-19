// import { ForbiddenError } from '@casl/ability';
//
// import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';
// import { HttpStatus } from '@nestjs/common';
//
// export function mapCaslForbiddenException(
//   exception: any,
// ): GeneralTypeException | null {
//   if (exception instanceof ForbiddenError) {
//     return new GeneralTypeException({
//       message: 'forbidden',
//       code: 'FORBIDDEN',
//       statusCode: HttpStatus.FORBIDDEN,
//       userFriendly: true,
//     });
//   }
//   return null;
// }
