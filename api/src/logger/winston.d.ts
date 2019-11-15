import * as winston from 'winston'

declare module 'winston' {
    export interface Logger {
      isLevelEnabled: (level: string) => boolean;
    }
  }