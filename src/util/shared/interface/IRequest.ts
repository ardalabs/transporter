export interface IRequestApiClient {
  version: string;
  platformVersion: string;
  device: string;
  locale: string;
}

export interface IApiRequest {
  requestId: string;
  apiClient: IRequestApiClient;
}
