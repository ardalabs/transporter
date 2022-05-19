import { APISTATUS } from '@util/enum';
import { IServices } from '@util/shared/interface/IServices';
import express from 'express';
import { HttpOutput } from '@util/shared/httpOutput';
import { AppBaseWorker } from '@core/worker/app/base/app.base.worker';
import { DapilWorker } from '@core/worker/dapil/dapil.worker';

export class LocationService implements IServices {
  path = '/dapil';
  r = express.Router();
  appBaseWorker?: AppBaseWorker;
  dapilWorker?: DapilWorker;
  constructor() {
    this.appBaseWorker = new AppBaseWorker();
    this.dapilWorker = new DapilWorker();
    this.initRouter();
  }
  private initRouter() {
    this.r.get(`${this.path}/ping`, this.ping);
    this.r.get(`${this.path}/dprri`, this.dprri);
    this.r.get(`${this.path}/dprri/:id`, this.dprriprov);
    this.r.get(`${this.path}/dprprov/:id`, this.dprprov);
    this.r.get(`${this.path}/dprkabkot/:id`, this.dprkabkot);
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
  private dprri  = async (
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
          await this.dapilWorker.getDprri(),
          null,
          null,
          {}
        )
      );
  };
  private dprriprov = async (
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
          await this.dapilWorker.getDprriProv(req.params.id),
          null,
          null,
          {}
        )
      );
  };
  private dprprov  = async (
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
          await this.dapilWorker.getDprprov(req.params.id),
          null,
          null,
          {}
        )
      );
  };
  private dprkabkot  = async (
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
          await this.dapilWorker.getDprkabkot(req.params.id),
          null,
          null,
          {}
        )
      );
  };
}
