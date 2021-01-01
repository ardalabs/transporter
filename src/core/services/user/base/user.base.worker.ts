import { QueryProxy } from '@core/kernel/';
import { User, IUser } from '../repository/user';
export interface IUserBaseWorker {
  findUserById(id: string): Promise<any>;
  findAllUser(params: any, options?: any, page?: number): Promise<any>;
  softDeleteUserById(id: string): Promise<any>;
  updateUserById(id: string, parameters: any): Promise<any>;
  hardDeleteUser(id: string): Promise<any>;
}
/**
 * in this class we will do basic operation, create, read, update, delete
 */
export class UserBaseWorker implements IUserBaseWorker {
  queryProxy?: QueryProxy;
  constructor() {
    this.queryProxy = new QueryProxy(User);
  }
  async updateUserById(id: string, parameters: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queryProxy
        .update({ _id: id }, parameters)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
  softDeleteUserById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queryProxy
        .update({ _id: id }, { isDeleted: true })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
  hardDeleteUser(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queryProxy
        .delete({ _id: id })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
  async findAllUser(params: any, options: any, page: number): Promise<any> {
    const limit: number = 10;
    return new Promise((resolve, reject) => {
      this.queryProxy
        .findAll(params, options, page ? page * limit : 0, limit)
        .then((data: IUser[]) => {
          resolve(data);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
  findUserById(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
