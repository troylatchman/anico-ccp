import { AxiosError } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

function isAxiosError(error: Error | AxiosError): error is AxiosError {
  try {
    return 'isAxiosError' in error;
  } catch (e) {
    return false;
  }
}

export function handleServiceError(error: Error | AxiosError) {
  if (isAxiosError(error) && error.response) {
    const statusCode =
      error.response.status === HttpStatus.INTERNAL_SERVER_ERROR
        ? HttpStatus.BAD_GATEWAY
        : error.response.status;
    throw new HttpException(error.response.data, statusCode);
  }
  throw error;
}
