
export class AppBaseWorker {
  // tslint:disable-next-line: no-empty
  constructor() {}
  ping(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve('PONG');
    });
  }
}
