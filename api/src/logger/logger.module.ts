import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';

export enum Loggers {
  ccp = 'ccp',
  ccpException = 'ccp-exception',
  eccs = 'eccs',
}
@Global()
@Module({
  providers: [
    LoggerService,
    {
      provide: Loggers.ccp,
      useFactory: (loggerService: LoggerService) => {
        return loggerService.ccpLogger;
      },
      inject: [LoggerService],
    },
    {
      provide: Loggers.ccpException,
      useFactory: (loggerService: LoggerService) => {
        return loggerService.ccpExceptionLogger;
      },
      inject: [LoggerService],
    },
    {
      provide: Loggers.eccs,
      useFactory: (loggerService: LoggerService) => {
        return loggerService.eccsLogger;
      },
      inject: [LoggerService],
    },
  ],
  exports: [Loggers.ccp, Loggers.ccpException, Loggers.eccs],
})
export class LoggerModule {}
