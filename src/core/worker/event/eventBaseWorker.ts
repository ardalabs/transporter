import { ILooseObject } from '@util/shared/interface';
import { IWorker } from '@util/shared/interface/IWorker';

export class EventBaseWorker implements IWorker {
  constructor() {}
  
  getAllList(parameters: ILooseObject): Promise<any> {
    throw new Error('Method not implemented.');
  }

  create(parameter: ILooseObject): Promise<any> {
    throw new Error('Method not implemented.');
  }
  
  update(id: string, parameter: ILooseObject): Promise<any> {
    throw new Error('Method not implemented.');
  }

  softDelete(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  hardDelete(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
