import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';

export function mapPrismaException(exception: any): GeneralTypeException | null {
  // Handle PrismaClientKnownRequestError
  if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    return handleKnownRequestError(exception);
  }
  
  // Handle PrismaClientUnknownRequestError
  if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
    return handleUnknownRequestError(exception);
  }
  
  // Handle PrismaClientValidationError
  if (exception instanceof Prisma.PrismaClientValidationError) {
    return handleValidationError(exception);
  }
  
  // Handle PrismaClientInitializationError
  if (exception instanceof Prisma.PrismaClientInitializationError) {
    return handleInitializationError(exception);
  }
  
  return null;
}

function handleKnownRequestError(error: Prisma.PrismaClientKnownRequestError): GeneralTypeException {
  const timestamp = new Date().toISOString();
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Database operation failed';
  let code = 'DATABASE_ERROR';
  let userFriendly = false;

  switch (error.code) {
    case 'P2002': // Unique constraint violation
      statusCode = HttpStatus.CONFLICT;
      message = `Duplicate entry for ${getFieldNames(error.meta?.target)}`;
      code = 'DUPLICATE_ENTRY';
      userFriendly = true;
      break;
      
    case 'P2025': // Record not found
      statusCode = HttpStatus.NOT_FOUND;
      message = 'The requested record was not found';
      code = 'RECORD_NOT_FOUND';
      userFriendly = true;
      break;
      
    case 'P2003': // Foreign key constraint violation
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Cannot perform operation due to related records';
      code = 'FOREIGN_KEY_VIOLATION';
      userFriendly = true;
      break;
      
    case 'P2014': // Required relation violation
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Required relationship is missing';
      code = 'REQUIRED_RELATION_VIOLATION';
      userFriendly = true;
      break;
      
    case 'P2021': // Table does not exist
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database schema error';
      code = 'SCHEMA_ERROR';
      break;
      
    case 'P2022': // Column does not exist
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database schema error';
      code = 'SCHEMA_ERROR';
      break;
      
    case 'P2023': // Inconsistent column data
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Invalid data format provided';
      code = 'INVALID_DATA_FORMAT';
      userFriendly = true;
      break;
      
    case 'P2024': // Connection timeout
      statusCode = HttpStatus.REQUEST_TIMEOUT;
      message = 'Database connection timeout';
      code = 'DATABASE_TIMEOUT';
      break;
      
    default:
      message = `Database error: ${error.message}`;
      code = error.code;
  }

  const detailedMessage = userFriendly 
    ? message 
    : `[${timestamp}] Prisma Error ${error.code}: ${error.message} | Meta: ${JSON.stringify(error.meta, null, 2)}`;

  return new GeneralTypeException({
    message: detailedMessage,
    code,
    statusCode,
    stack: error.stack,
    userFriendly,
  });
}

function handleUnknownRequestError(error: Prisma.PrismaClientUnknownRequestError): GeneralTypeException {
  const timestamp = new Date().toISOString();
  
  return new GeneralTypeException({
    message: `[${timestamp}] Unknown database error: ${error.message}`,
    code: 'UNKNOWN_DATABASE_ERROR',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    stack: error.stack,
    userFriendly: false,
  });
}

function handleValidationError(error: Prisma.PrismaClientValidationError): GeneralTypeException {
  return new GeneralTypeException({
    message: 'Invalid query parameters or data structure',
    code: 'VALIDATION_ERROR',
    statusCode: HttpStatus.BAD_REQUEST,
    stack: error.stack,
    userFriendly: true,
  });
}

function handleInitializationError(error: Prisma.PrismaClientInitializationError): GeneralTypeException {
  const timestamp = new Date().toISOString();
  
  return new GeneralTypeException({
    message: `[${timestamp}] Database connection failed: ${error.message}`,
    code: 'DATABASE_CONNECTION_ERROR',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    stack: error.stack,
    userFriendly: false,
  });
}

// Helper function to format field names from meta target
function getFieldNames(target: any): string {
  if (Array.isArray(target)) {
    return target.join(', ');
  }
  if (typeof target === 'string') {
    return target;
  }
  return 'field(s)';
}
