import express from 'express';
import { CONFIG } from '@util/config/config';
import { logger } from '@util/logger/logger';
import { ArdaAppUse } from './arda.app.use';

export class Kernel {
  config: any;
  dbUrl: string;
  defaultServices: express.Application;
  appUse: ArdaAppUse;

  constructor() {
    this.config = CONFIG;
    this.dbUrl = CONFIG.DB_URL;
    this.defaultServices = express();
    this.appUse = new ArdaAppUse(this.defaultServices);
  }

  appService() {
    this.defaultServices.listen(this.config.PORT, () => {
      logger.info(`run on ${this.config.APP_ENV ?? 'development'}`);
      logger.info(
        `Server Started!, running app: ${this.config.NAME} Express: http://localhost:${this.config.PORT}`
      );
    });
  }
}
