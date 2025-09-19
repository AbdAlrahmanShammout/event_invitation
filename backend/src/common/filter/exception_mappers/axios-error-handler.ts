import axios, { AxiosError } from 'axios';
import { GeneralTypeException } from '@/common/filter/exception_return_handler/type/general-type.exception';

export function mapAxiosErrorException(exception: any) {
  if (axios.isAxiosError(exception)) {
    const error: AxiosError = exception;
    const timestamp = new Date().toISOString();
    const baseURL = error.config?.baseURL ?? ''; // Get base URL if available
    const requestUrl = `${baseURL}${error.config?.url ?? 'Unknown URL'}`; // Append base URL
    const method = error.config?.method?.toUpperCase() ?? 'Unknown Method';
    const status = error.response?.status ?? 'No status';
    const responseData = error.response?.data ?? 'No response data';
    const requestParams = error.config?.params ?? 'No parameters';
    const requestBody = error.config?.data ?? 'No body';

    // Ensure responseData, requestParams, and requestBody are strings (pretty-printed JSON)
    const formattedResponse =
      typeof responseData === 'object'
        ? JSON.stringify(responseData, null, 2)
        : responseData;
    const formattedParams =
      typeof requestParams === 'object'
        ? JSON.stringify(requestParams, null, 2)
        : requestParams;
    const formattedBody =
      typeof requestBody === 'string'
        ? JSON.stringify(JSON.parse(requestBody), null, 2)
        : requestBody;

    // Combine all details into a single message
    const errorMessage = `[${timestamp}] Axios Error: ${error.message} | Method: ${method} | URL: ${requestUrl} | Status: ${status} | Response: ${formattedResponse} | Params: ${formattedParams} | Body: ${formattedBody}`;
    return new GeneralTypeException({
      message: errorMessage,
      code: error.code,
      userFriendly: true,
    });
  }
}
