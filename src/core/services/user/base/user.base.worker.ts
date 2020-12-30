import { QueryProxy } from '@core/kernel/';
export interface IUserBaseWorker {
  findUserById(id: string): Promise<any>;
  findAllUser(params: any): Promise<any>;
  softDeleteUser(id: string): Promise<any>;
  hardDeleteUser(id: string): Promise<any>;
}
export class UserBaseWorker implements IUserBaseWorker {
  queryProxy?: QueryProxy;
  constructor() {
    this.queryProxy = new QueryProxy(null)
  }
  softDeleteUser(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  hardDeleteUser(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findAllUser(params: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findUserById(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

}