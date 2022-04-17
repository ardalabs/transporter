import { APISTATUS } from '@util/enum';
import { IServices } from '@util/shared/interface/IServices';
import express from 'express';
import { HttpOutput } from '@util/shared/httpOutput';
import { AppBaseWorker } from '@core/worker/app/base/app.base.worker';
import { ExecutorWorker } from '@core/worker/executor/executor.worker';

export class ExecutorBaseService implements IServices {
  path = '/execute';
  r = express.Router();
  appBaseWorker?: AppBaseWorker;
  executorWorker?: ExecutorWorker;
  constructor() {
    this.appBaseWorker = new AppBaseWorker();
    this.executorWorker = new ExecutorWorker();
    this.initRouter();
  }
  private initRouter() {
    this.r.get(`${this.path}/ping`, this.ping);
    this.r.get(`${this.path}/getProvince`, this.getProvince);
  }

  private ping = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res
      .status(200)
      .send(
        new HttpOutput(
          APISTATUS.SUCCESS,
          APISTATUS.SUCCESS,
          await this.appBaseWorker.ping(),
          null,
          null,
          {}
        )
      );
  };
  private getProvince  = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res
      .status(200)
      .send(
        new HttpOutput(
          APISTATUS.SUCCESS,
          APISTATUS.SUCCESS,
          await this.executorWorker.getProvince(),
          null,
          null,
          {}
        )
      );
  };
}
