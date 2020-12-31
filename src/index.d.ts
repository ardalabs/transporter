import { IRequestApiClient, ILooseObject } from '@util/shared/interface';
export {};
declare global {
  namespace Express {
    interface Request {
      requestId: string;
      api: ILooseObject;
      apiClient?: IRequestApiClient;
    }
    interface String {
      fancyFormat(opts: StringFormatOptions): string;
    }
  }
}
export interface StringFormatOptions {
  fancinessLevel: number;
}
declare module '*.json' {
  const value: any;
  export default value;
}
