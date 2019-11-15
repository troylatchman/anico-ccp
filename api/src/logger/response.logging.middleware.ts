import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
import { Loggers } from './logger.module';

@Injectable()
export class ResponseLoggingMiddleware implements NestMiddleware {
  constructor(@Inject(Loggers.ccp) private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks: Buffer[] = [];
    const startMilliseconds = Date.now();

    // tslint:disable-next-line: only-arrow-functions
    res.write = function(chunk: any) {
      chunks.push(Buffer.from(chunk));
      return oldWrite.apply(res, arguments);
    };

    // tslint:disable-next-line: only-arrow-functions
    res.end = function(chunk: any) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      const resBody = Buffer.concat(chunks).toString('utf8');
      const {
        summary,
        requestDetails,
        responseDetails,
        statusCodeError,
      } = this.parseResponse({
        req,
        res,
        resBody,
        startMilliseconds,
      });
      const logOutput = this.logger.isLevelEnabled('debug')
        ? `${summary}\n${requestDetails}\n${responseDetails}`
        : `${summary}`;
      statusCodeError
        ? this.logger.error(logOutput)
        : this.logger.info(logOutput);
      oldEnd.apply(res, arguments);
    }.bind(this);
    next();
  }
  parseResponse({
    req,
    res,
    resBody,
    startMilliseconds,
  }: {
    req: Request;
    res: Response;
    resBody: string;
    startMilliseconds: number;
  }) {
    const elapsedMilliseconds = Date.now() - startMilliseconds;
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const summary = `${req.method} ${fullUrl} ${res.statusCode} ${elapsedMilliseconds}`;
    const requestDetails = JSON.stringify({
      requestDetails: {
        headers: req.headers,
        body: req.body,
      },
    });
    const responseDetails = JSON.stringify({
      responseDetails: {
        headers: res.getHeaders(),
        body: JSON.parse(resBody),
      },
    });
    const statusCodeError =
      res.statusCode && res.statusCode >= 200 && res.statusCode < 300
        ? false
        : true;
    return {
      summary,
      requestDetails,
      responseDetails,
      statusCodeError,
    };
  }
}
