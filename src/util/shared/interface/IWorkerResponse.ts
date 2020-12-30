export interface IWorkerResponse {
  message?: string;
  data?: any;
  additionalData?: any;
  totalPage?: number; /// this is for total data
  currentPage?: number;
}
