export class HttpOutput {
  public data?: any;
  public message?: string;
  public totalPage?: number;
  public additionalData?: any;
  public currentPage?: number;
  public status?: string;
  constructor(
    status?: string,
    message?: string,
    data?: any,
    currentPage?: number,
    totalPage?: number,
    additionalData?: any
  ) {
    this.data = data;

    if (currentPage) {
      this.currentPage = currentPage;
    }

    if (totalPage) {
      this.totalPage = totalPage;
    }
    this.additionalData = additionalData;
    this.message = message;
    this.status = status;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class HttpOutputDt {
  public data?: any;
  public message?: string;
  public recordsTotal?: number;
  public recordsFiltered?: number;
  public pageTotal?: number;
  public additionalData?: any;
  public draw?: number;

  constructor(
    message?: string,
    data?: any,
    draw?: number,
    recordsTotal?: number,
    recordsFiltered?: number,
    pageTotal?: number,
    additionalData?: any
  ) {
    this.data = data;
    this.recordsTotal = 10;
    this.draw = draw;
    this.recordsFiltered = recordsFiltered;
    this.message = message;
    this.pageTotal = pageTotal;
    this.additionalData = additionalData;
  }
}
