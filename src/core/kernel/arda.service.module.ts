import { Kernel } from './arda.core';
import { IServices } from '@util/shared/interface';
import express from 'express';
import { API_VERSION } from '@util/enum/common';
import basicAuth from '@util/auth/basicAuth';
import { AppBaseService } from '@core/services/app/base/app.base.service';
import { ExecutorBaseService } from '@core/services/executor/executor.service';
import { LocationService } from '@core/services/location/location.service';
import { DapilService } from '@core/services/dapil/dapil.service';

const commonServices: IServices[] = [
  new AppBaseService(),
  new ExecutorBaseService(),
  new LocationService(),
  new DapilService()
];

interface IArdaServiceModule {
  registerCommonServices(
    services: express.Application,
    version: API_VERSION
  ): void;
}

export class ArdaServiceModule extends Kernel implements IArdaServiceModule {
  registerCommonServices(
    services: express.Application,
    version: API_VERSION
  ): void {
    if (version === API_VERSION.V1) {
      commonServices.forEach((_ct: IServices) => {
        services.use(`/${version}/`, _ct.r);
      });
    }
  }
}
