import { Dapilri } from '@core/model/Dapilri';
import { Dapilprov } from '@core/model/Dapilprov';
import { Dapilkabkot } from '@core/model/Dapilkab';

import { logger } from '@util/logger/logger';
import QueryProxy from '@core/kernel/arda.storage';

export class DapilWorker {
  qdprri?: QueryProxy;
  qdprprov?: QueryProxy;
  qdprkabkot: QueryProxy;
  // tslint:disable-next-line: no-empty
  constructor() {
    this.qdprri = new QueryProxy(Dapilri);
    this.qdprprov = new QueryProxy(Dapilprov);
    this.qdprkabkot = new QueryProxy(Dapilkabkot);
  }
  getDprri(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qdprri.findAll({}, {populate:'wilayah'});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
  getDprriProv(id:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qdprri.findAll({id_province:id}, {populate:'wilayah'});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
  getDprprov(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qdprprov.findAll({ id_province:id }, {populate:['wilayah','wilayahKec']});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
  getDprkabkot(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qdprkabkot.findAll({ id_kabkot: id }, {});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
}
