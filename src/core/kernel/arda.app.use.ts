import { logger } from '@util/logger/logger';
import bodyParser from 'body-parser';
import { Application, Express } from 'express';
import express from 'express';
import { uuid } from 'uuidv4';

export class ArdaAppUse {
  constructor(private app: Application) {
    this.setup();
    this.requestLogger();
    this.enableCors();
  }

  private setup() {
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', true);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }
  private enableCors() {
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD'); // update to match the domain you will make the request from
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
      }
    );
  }
  private getLoggerForStatusCode(statusCode: number) {
    if (statusCode >= 500) {
      // tslint:disable-next-line: no-console
      return console.error.bind(console);
    }
    if (statusCode >= 400) {
      // tslint:disable-next-line: no-console
      return console.warn.bind(console);
    }

    // tslint:disable-next-line: no-console
    return console.log.bind(console);
  }

  private requestLogger() {
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        req.requestId = uuid();
        const cleanup = () => {
          res.removeListener('finish', logFn);
          res.removeListener('close', abortFn);
          res.removeListener('error', errorFn);
        };

        const logFn = () => {
          cleanup();
          const loggers = this.getLoggerForStatusCode(res.statusCode);
          loggers(
            `[${req.requestId}]  ${new Date().toISOString()} - ${
              res.statusCode
            } ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`
          );
        };
        const abortFn = () => {
          cleanup();
          logger.warn('Request aborted by the client');
        };

        const errorFn = (err: any) => {
          cleanup();
          logger.warn(`Request pipeline error: ${err}`);
        };
        res.on('finish', logFn); // successful pipeline (regardless of its response)
        res.on('close', abortFn); // aborted pipeline
        res.on('error', errorFn); // pipeline internal error
        next();
      }
    );
  }
}
