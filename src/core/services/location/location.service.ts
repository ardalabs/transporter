import { APISTATUS } from '@util/enum';
import { IServices } from '@util/shared/interface/IServices';
import express from 'express';
import { HttpOutput } from '@util/shared/httpOutput';
import { AppBaseWorker } from '@core/worker/app/base/app.base.worker';
import { LocationWorker } from '@core/worker/location/location.worker';

export class LocationService implements IServices {
  path = '/location';
  r = express.Router();
  appBaseWorker?: AppBaseWorker;
  locationWorker?: LocationWorker;
  constructor() {
    this.appBaseWorker = new AppBaseWorker();
    this.locationWorker = new LocationWorker();
    this.initRouter();
  }
  private initRouter() {
    this.r.get(`${this.path}/ping`, this.ping);
    this.r.get(`${this.path}/province`, this.getProvince);
    this.r.get(`${this.path}/kabkot/:id`, this.getKabkot);
    this.r.get(`${this.path}/kecamatan/:id`, this.getKecamatan);
    this.r.get(`${this.path}/desa/:id`, this.getDesa);
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
          await this.locationWorker.getProvince(),
          null,
          null,
          {}
        )
      );
  };
  private getKabkot  = async (
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
          await this.locationWorker.getKabkot(req.params.id),
          null,
          null,
          {}
        )
      );
  };
  private getKecamatan  = async (
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
          await this.locationWorker.getKecamatan(req.params.id),
          null,
          null,
          {}
        )
      );
  };
  private getDesa  = async (
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
          await this.locationWorker.getDesa(req.params.id),
          null,
          null,
          {}
        )
      );
  };
}
