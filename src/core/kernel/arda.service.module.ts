import { Kernel } from './arda.core';
import { IServices } from '@util/shared/interface';
import express from 'express';
import { API_VERSION } from '@util/enum/common';
import basicAuth from '@util/auth/basicAuth';
import { AppBaseService } from '@core/services/app/base/app.base.service';

const commonServices: IServices[] = [new AppBaseService()];

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
        services.use(`/${version}/`, basicAuth, _ct.r);
      });
    }
  }
}
