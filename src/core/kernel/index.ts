import { ArdaAppUse } from './arda.app.use';
import { ArdaServiceModule } from './arda.service.module';
import { ArdaStorage, QueryProxy } from './arda.storage';
import { ArdaCacheManager } from './arda.cache';
import { Kernel } from './arda.core';

export * from './arda.app.use';
export * from './arda.service.module';
export * from './arda.storage';
export * from './arda.cache';
export * from './arda.core';

export default {
  use: ArdaAppUse,
  queryproxy: QueryProxy,
  core: Kernel,
  service: ArdaServiceModule,
  storage: ArdaStorage,
  cache: ArdaCacheManager
};
