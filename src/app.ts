import 'module-alias/register';
import { logger } from '@util/logger/logger';
import kernel, { Kernel } from '@core/kernel';
import { API_VERSION } from '@util/enum';
import { LocationSyncWorker } from '@core/worker/executor/executor.worker';
interface IApps {
  listen(): void;
  initializeCoreServices(): Promise<void>;
}

export class App implements IApps {
  locationSync: LocationSyncWorker;
  kernel: Kernel;
  constructor() {
    this.kernel = new kernel.core();
    this.locationSync = new LocationSyncWorker();
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
