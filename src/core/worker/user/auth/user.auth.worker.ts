import { UserBaseWorker } from '../base/user.base.worker';
// tslint:disable-next-line: no-empty-interface
export interface IUserAuthWorker {}
export class UserAuthWorker extends UserBaseWorker implements IUserAuthWorker {
  constructor() {
    super();
  }
}
