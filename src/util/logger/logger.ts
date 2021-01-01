import * as winston from 'winston';
import * as chalk from 'chalk';
const { combine, timestamp, label, printf } = winston.format;
const colorizer = winston.format.colorize();

export const logger: winston.Logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4
  },
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((debug) => {
      const {
        // tslint:disable-next-line: no-shadowed-variable
        timestamp,
        level,
        message,
        ...args
      } = debug;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
      }`;
    })
  ),
  transports: [new winston.transports.Console({ level: 'info' })]
});
const env = process.env.NODE_ENV;
// Development Logger
// tslint:disable-next-line: no-empty
if (env === 'development') {
}

process.on('unhandledRejection', () => {
  return (reason: any, p: any) => {
    // tslint:disable-next-line: indent
    logger.warn(
      'system level exceptions at, Possibly Unhandled Rejection at: Promise ',
      p,
      ' reason: ',
      reason
    );
  };
});
