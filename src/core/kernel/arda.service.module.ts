import { Kernel } from './arda.core';
import { IServices } from '@util/shared/interface';
import express from 'express';
import { AppBaseService } from '@core/services/app';

const commonServices: IServices[] = [new AppBaseService()];

interface IArdaServiceModule {
  registerCommonServices(services: express.Application): void;
}

export class ArdaServiceModule extends Kernel implements IArdaServiceModule {
  registerCommonServices(services: express.Application): void {
    commonServices.forEach((_ct: IServices) => {
      services.use('/v1/', _ct.r);
    });
  }
}
