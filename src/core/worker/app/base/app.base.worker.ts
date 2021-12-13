export interface IAppBaseWorker {
  ping(): Promise<any>;
}
export class AppBaseWorker implements IAppBaseWorker {
  // tslint:disable-next-line: no-empty
  constructor() {}
  ping(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve('PONG');
    });
  }
}
