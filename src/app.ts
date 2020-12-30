import 'module-alias/register';
import { logger } from '@util/logger/logger';
import kernel,{ Kernel } from '@core/kernel';
interface IApps {
  listen(): void;
  initializeCoreServices(): Promise<void>;
}

export class App implements IApps {
  kernel: Kernel;
  constructor() {
    this.kernel = new kernel.core()
    this.initializeCoreServices();
  }
  async initializeCoreServices(): Promise<void> {
    logger.info('start all service from kernel');
    new kernel.service().registerCommonServices(this.kernel.defaultServices);
    new kernel.storage().connect();
  }
  listen() {
    logger.info('app listen starting');
    this.kernel.appService();
  }
}
