import 'module-alias/register';
import { IServices } from '@util/shared/interface';

interface IApps {
  listen(): void;
  initController(_c: IServices[]): void;
  initReportController(_c: IServices[]): void;
  initSimulator(_c: IServices[]): void;
}

export class App implements IApps {
  listen(): void {
    throw new Error("Method not implemented.");
  }
  initController(_c: IServices[]): void {
    throw new Error("Method not implemented.");
  }
  initReportController(_c: IServices[]): void {
    throw new Error("Method not implemented.");
  }
  initSimulator(_c: IServices[]): void {
    throw new Error("Method not implemented.");
  } 

}