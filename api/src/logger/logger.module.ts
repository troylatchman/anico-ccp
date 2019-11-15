import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

export enum Loggers {
  ccp = 'ccp',
  eccs = 'eccs',
}

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
      provide: Loggers.eccs,
      useFactory: (loggerService: LoggerService) => {
        return loggerService.eccsLogger;
      },
      inject: [LoggerService],
    },
  ],
  exports: [Loggers.ccp, Loggers.eccs],
})
export class LoggerModule {}
