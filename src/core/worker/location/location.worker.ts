import { Province } from '@core/model/Province';
import { Kabkot } from '@core/model/Kabkot';
import { Desa } from '@core/model/Desa';
import { Kecamatan } from '@core/model/Kecamatan';
import { logger } from '@util/logger/logger';
import QueryProxy from '@core/kernel/arda.storage';

export class LocationWorker {
  qprovince?: QueryProxy;
  qkabkot?: QueryProxy;
  qkecamatan?: QueryProxy;
  qdesa?: QueryProxy;
  // tslint:disable-next-line: no-empty
  constructor() {
    this.qprovince = new QueryProxy(Province);
    this.qkabkot = new QueryProxy(Kabkot);
    this.qkecamatan = new QueryProxy(Kecamatan);
    this.qdesa = new QueryProxy(Desa);
  }
  getProvince(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qprovince.findAll({}, {});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
  getKabkot(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qkabkot.findAll({ id_province: id }, {});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
  getKecamatan(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qkecamatan.findAll({ id_kabkot: id }, {});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
  getDesa(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.qdesa.findAll({ id_kecamatan: id }, {});
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  }
}
