import { APISTATUS } from '@util/enum';
import { IServices } from '@util/shared/interface/IServices';
import express from 'express';
import { HttpOutput } from '@util/shared/httpOutput';
import { AppBaseWorker } from '@core/worker/app/base/app.base.worker';

export class AppBaseService implements IServices {
  path = '/app';
  r = express.Router();
  appBaseWorker?: AppBaseWorker;
  constructor() {
    this.appBaseWorker = new AppBaseWorker();
    this.initRouter();
  }
  private initRouter() {
    this.r.get(`${this.path}/ping`, this.ping);
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
}
