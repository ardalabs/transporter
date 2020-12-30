import { IRequestApiClient, ILooseObject } from '@util/shared/interface';
export {};
declare global {
  namespace Express {
    interface Request {
      requestId: string;
      api: ILooseObject;
      apiClient?: IRequestApiClient;
    }
  }
}
declare module '*.json' {
  const value: any;
  export default value;
}
