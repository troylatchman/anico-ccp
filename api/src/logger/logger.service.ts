import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  ccpLogger: winston.Logger;
  eccsLogger: winston.Logger;

  constructor() {
    this.ccpLogger = winston.loggers.add('ccp', {
      format: this.logFormat,
      level: 'debug',
      transports: [
        // @ts-ignore
        new winston.transports.DailyRotateFile({
          ...this.dailyRotateTransportOptions,
          filename: 'ccp-%DATE%.log',
        }),
      ],
    });

    this.eccsLogger = winston.loggers.add('eccs', {
      format: this.logFormat,
      level: 'debug',
      transports: [
        // @ts-ignore
        new winston.transports.DailyRotateFile({
          ...this.dailyRotateTransportOptions,
          filename: 'eccs-%DATE%.log',
        }),
      ],
    });
  }

  private logFormat = winston.format.printf(this.logTemplate);

  private logTemplate({
    level,
    message,
    label,
  }: {
    level: string;
    message: any;
    label: string;
  }) {
    let logLabel = ' ';
    if (label) {
      logLabel = ` ${label}: `.toUpperCase();
    }
    let logMessage = message || '';
    if (typeof message === 'object') {
      logMessage = JSON.stringify(message);
    }
    const logTimestamp = format(new Date(), `MM/dd/yyyy hh:mm:ss.SSS a`);
    const logLevel = level.toUpperCase();
    return `${logTimestamp} [${logLevel}]${logLabel}${logMessage}`;
  }

  private dailyRotateTransportOptions = {
    dirname: 'logs',
    filename: 'CHANGE_ME-%DATE%.log',
    datePattern: 'MM-DD-YYYY',
    maxSize: '20m',
    maxFiles: '7d',
  };
}
