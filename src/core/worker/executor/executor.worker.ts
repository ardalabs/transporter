import { Province } from '@core/model/Province';

export class ExecutorWorker {
  // tslint:disable-next-line: no-empty
  constructor() {}
  getProvince(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const axios = require('axios');
      let pem = await axios.get(
        'https://pemilu2019.kpu.go.id/static/json/wilayah/0.json'
      );
      let myMap = [];
      interface Province {
        nama: String,
        dapil: String[]
      }
      for (const [key, value] of Object.entries(pem.data)) {
        let prov = <Province>value;
        let objMap={
            id:key,
            nama:prov.nama,
            dapil:prov.dapil
        }
        myMap.push(objMap)
      }
      Province.insertMany(myMap)
      resolve("sukses");
    });
  }
  getKabkot(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const axios = require('axios');
      let pem = await axios.get(
        'https://pemilu2019.kpu.go.id/static/json/wilayah/0.json'
      );
      let myMap = [];
      interface Province {
        nama: String,
        dapil: String[]
      }
      for (const [key, value] of Object.entries(pem.data)) {
        let prov = <Province>value;
        let objMap={
            id:key,
            nama:prov.nama,
            dapil:prov.dapil
        }
        myMap.push(objMap)
      }
      Province.insertMany(myMap)
      resolve("sukses");
    });
  }
}
