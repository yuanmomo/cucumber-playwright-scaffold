import winston from 'winston';
import * as path from 'path';

const accessLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'access.log'),
    }),
  ],
});

export interface RequestLog {
  url: string;
  method: string;
  headers?:  Record<string, string>;
  body?: any;
}

export interface ResponseLog {
  status: number;
  headers?:  Record<string, string>;
  body?: any;
}

export class AccessLogger {
  static logRequest(request: RequestLog): void {
    accessLogger.info('REQUEST', {
      type: 'REQUEST',
      url: request.url,
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  static logResponse(request: RequestLog, response: ResponseLog): void {
    accessLogger.info('RESPONSE', {
      type: 'RESPONSE',
      request: {
        url: request.url,
        method: request.method,
      },
      response: {
        status: response.status,
        headers: response.headers,
        body: response.body,
      },
    });
  }
}