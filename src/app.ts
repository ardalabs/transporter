import 'module-alias/register';
import { logger } from '@util/logger/logger';
import kernel, { Kernel } from '@core/kernel';
import {LocationSyncWorker} from '@core/worker/executor/executor.worker';
import { API_VERSION } from '@util/enum';
interface IApps {
  listen(): void;
  initializeCoreServices(): Promise<void>;
}

export class App implements IApps {
  kernel: Kernel;
  locationSyncWorker: LocationSyncWorker;
  constructor() {
    this.kernel = new kernel.core();
    this.locationSyncWorker = new LocationSyncWorker();
    this.locationSyncWorker.executeWorkerOperationDapilDprri();
    this.initializeCoreServices();
  }
  async initializeCoreServices(): Promise<void> {
    logger.info('start all service from kernel');
    new kernel.service().registerCommonServices(
      this.kernel.defaultServices,
      API_VERSION.V1
    );
    new kernel.storage().connect();
  }
  listen() {
    logger.info('app listen starting');
    this.kernel.appService();
  }
}
