import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger as NestLogger,
  Inject,
} from '@nestjs/common';
import { isObject, isNil, isSymbol } from '@nestjs/common/utils/shared.utils';
import { Loggers } from '../logger/logger.module';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(Loggers.ccpException) private readonly ccpExceptionLogger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const {
      logMessage,
      logMessageWithStack,
      stack,
      statusCode,
      responseBody,
    } = this.parseException(exception);
    NestLogger.error(logMessage, stack, 'AllExceptionsFilter');
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      // special logging for unhandled exceptions - CCP developers must fix these!
      this.ccpExceptionLogger.error(logMessageWithStack);
    }
    response.status(statusCode).json(responseBody);
  }

  parseException(
    exception: unknown,
  ): {
    logMessage: string | undefined;
    logMessageWithStack: string;
    stack: string | undefined;
    statusCode: number;
    responseBody: string | object;
  } {
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let logMessage: string;
    let logMessageWithStack: string | undefined;
    let stack: string | undefined;
    let responseBody: string | object = '';
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseBody = exception.getResponse();
      if (isObject(exception.getResponse())) {
        logMessage = JSON.stringify(exception.getResponse());
      } else {
        logMessage = exception.getResponse() as string;
      }
      stack = exception.stack;
    } else if (exception instanceof Error) {
      logMessage = exception.message;
      stack = exception.stack;
    } else if (isObject(exception)) {
      logMessage = JSON.stringify(exception);
    } else if (isSymbol(exception)) {
      logMessage = exception.toString();
    } else if (isNil(exception)) {
      logMessage = 'Message not available';
    } else {
      logMessage = exception as string;
    }
    if (!responseBody) {
      responseBody = {
        message: logMessage,
        stack,
      };
    }
    logMessageWithStack = this.formatMessageWithStack(logMessage, stack);
    return {
      logMessage,
      logMessageWithStack,
      stack,
      statusCode,
      responseBody,
    };
  }

  formatMessageWithStack(message: string, stack: string | undefined): string {
    if (stack) {
      stack = stack
        .split('\n')
        .slice(1)
        .join('\n');
    }
    return `${message}\n${stack || 'Stack not available'}`;
  }
}
