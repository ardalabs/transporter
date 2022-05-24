import { Province } from '@core/model/Province';
import { Kabkot } from '@core/model/Kabkot';
import { Desa } from '@core/model/Desa';
import { Kecamatan } from '@core/model/Kecamatan';
import { Dapilri } from '@core/model/Dapilri';
import { Dapilprov } from '@core/model/Dapilprov';
import { Dapilkabkot } from '@core/model/Dapilkab';
import * as cron from 'node-cron';
import { CRON } from '@util/enum/common';
import { logger } from '@util/logger/logger';

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
        nama: String;
        dapil: String[];
      }
      for (const [key, value] of Object.entries(pem.data)) {
        let prov = <Province>value;
        let objMap = {
          id: key,
          nama: prov.nama,
          dapil: prov.dapil
        };
        myMap.push(objMap);
      }
      Province.insertMany(myMap);
      resolve('sukses');
    });
  }
}

export class LocationSyncWorker {
  constructor() {}

  startAllCronJob() {
    this.executeWorkerOperationDapilDprkbakot();
  }
  executeWorkerOperationDapilDprri() {
    cron.schedule(CRON.EVERY_2_SEC, async () => {
      logger.info('start cronjob');
      const province = await Province.find().lean();
      let noTfound = true;
      let i = 0;
      let isFoud = false;
      do {
        const dapilri = await Dapilri.count({ province: province[i]._id });
        console.log(i, province[i].nama);
        if (dapilri < 1) {
          console.log('found', province[i].nama);
          const axios = require('axios');
          let pem = await axios.get(
            'https://infopemilu.kpu.go.id/pileg2019/api/dapil/' +
              province[i].id +
              '/0'
          );
          let myMap: Array<any> = [];
          interface Dapilri {
            id: String;
            id_province: String;
            nama: String;
            wilayah: Array<String>;
            jml_kursi: Number;
            idVersi: String;
            noDapil: String;
            statusCoterminous: Boolean;
          }
          for (const valueParent of pem.data) {
            for (const value of valueParent.dapil) {
              let dapil = <any>value;
              let wilayah: Array<any> = [];
              for (const elementW of dapil.wilayah) {
                const prv:any = await Kabkot.findOne({id:elementW.idWilayah}).lean()
                wilayah.push(prv._id);
              }
              let objMap = {
                id: dapil.id,
                id_province: province[i].id,
                province: province[i]._id,
                nama: dapil.nama,
                jml_kursi: dapil.totalAlokasiKursi,
                idVersi: dapil.idVersi,
                noDapil: dapil.noDapil,
                statusCoterminous: dapil.statusCoterminous,
                wilayah
              };

              const exInDb = await Dapilri.find({ id: dapil.id }).count();
              if (exInDb < 1) {
                myMap.push(objMap);
              }
            }
          }
          await Dapilri.insertMany(myMap);
          noTfound = false;
          isFoud = true;
          console.log('finish', province[i].nama);
        }
        i++;
        if (i > province.length) {
          noTfound = false;
        }
      } while (noTfound);
      if (!isFoud) {
        logger.info('finish cronjob kabkot');
      }
    });
  }
  executeWorkerOperationDapilDprprov() {
    cron.schedule(CRON.EVERY_2_SEC, async () => {
      logger.info('start cronjob');
      const province = await Province.find().lean();
      let noTfound = true;
      let i = 0;
      let isFoud = false;
      do {
        const dapilprov = await Dapilprov.count({ province: province[i]._id });
        console.log(i, province[i].nama);
        if (dapilprov < 1) {
          console.log('found', province[i].nama);
          const axios = require('axios');
          let pem = await axios.get(
            'https://infopemilu.kpu.go.id/pileg2019/api/dapil/' +
              province[i].id +
              '/1'
          );
          let myMap: Array<any> = [];
          interface Dapilprov {
            id: String;
            id_province: String;
            nama: String;
            wilayah: Array<String>;
            jml_kursi: Number;
            idVersi: String;
            noDapil: String;
            statusCoterminous: Boolean;
          }
          for (const valueParent of pem.data) {
            for (const value of valueParent.dapil) {
              let dapil = <any>value;
              let wilayah: Array<any> = [];
              let wilayahKec: Array<any> = [];
              for (const elementW of dapil.wilayah) {
                const prv:any = await Kabkot.findOne({id:elementW.idWilayah}).lean()
                if(prv){
                  wilayah.push(prv._id);
                }else{
                  const kec:any = await Kecamatan.findOne({id:elementW.idWilayah}).lean()
                  wilayahKec.push(kec._id);
                }
              }
              let objMap = {
                id: dapil.id,
                id_province: province[i].id,
                province: province[i]._id,
                nama: dapil.nama,
                jml_kursi: dapil.totalAlokasiKursi,
                idVersi: dapil.idVersi,
                noDapil: dapil.noDapil,
                statusCoterminous: dapil.statusCoterminous,
                wilayah,
                wilayahKec
              };
              const exInDb = await Dapilprov.find({ id: dapil.id }).count();
              if (exInDb < 1) {
                myMap.push(objMap);
              }
            }
          }
          await Dapilprov.insertMany(myMap);
          noTfound = false;
          isFoud = true;
          console.log('finish', province[i].nama);
        }
        i++;
        if (i > province.length) {
          noTfound = false;
        }
      } while (noTfound);
      if (!isFoud) {
        logger.info('finish cronjob kabkot');
      }
    });
  }
  executeWorkerOperationDapilDprkbakot() {
    cron.schedule(CRON.EVERY_2_SEC, async () => {
      logger.info('start cronjob');
      const province = await Province.find().lean();
      let noTfound = true;
      let i = 0;
      let isFoud = false;
      do {
        const kabkot = await Kabkot.find({ province: province[i]._id }).lean();
        console.log('Prov', i, province[i].nama);
        if (kabkot.length > 0) {
          let noTfoundkc = true;
          let ikc = 0;
          let isFoudkc = false;
          do {
            const dapilkabkot = await Dapilkabkot.count({
              kabkot: kabkot[ikc]._id
            });
            if (dapilkabkot < 1) {
              console.log('found', kabkot[ikc].nama);
              const axios = require('axios');
              let pem = await axios.get(
                'https://infopemilu.kpu.go.id/pileg2019/api/dapil/' +
                kabkot[ikc].id +
                  '/2'
              );
              let myMap: Array<any> = [];
              interface Dapilkabkot {
                id: String;
                id_kabkot: String;
                nama: String;
                wilayah: Array<String>;
                jml_kursi: Number;
                idVersi: String;
                noDapil: String;
                statusCoterminous: Boolean;
              }
              if(pem.data.length>0){
                for (const valueParent of pem.data) {
                  for (const value of valueParent.dapil) {
                    let dapil = <any>value;
                    let wilayah: Array<any> = [];
                    let wilayahDesa: Array<any> = [];
                    for (const elementW of dapil.wilayah) {
                      const prv:any = await Kecamatan.findOne({id:elementW.idWilayah}).lean()
                      if(prv){
                        wilayah.push(prv._id);
                      }else{
                        const kec:any = await Desa.findOne({id:elementW.idWilayah}).lean()
                        wilayahDesa.push(kec._id);
                      }
                    }
                    let objMap = {
                      id: dapil.id,
                      id_province: province[i].id,
                      id_kabkot: kabkot[ikc].id,
                      province: province[i]._id,
                      kabkot: kabkot[ikc]._id,
                      nama: dapil.nama,
                      jml_kursi: dapil.totalAlokasiKursi,
                      idVersi: dapil.idVersi,
                      noDapil: dapil.noDapil,
                      statusCoterminous: dapil.statusCoterminous,
                      wilayah,
                      wilayahDesa
                    };
  
                    const exInDb = await Dapilkabkot.find({ id: dapil.id }).count();
                    if (exInDb < 1) {
                      myMap.push(objMap);
                    }
                  }
                }
                await Dapilkabkot.insertMany(myMap);
                noTfoundkc = false;
                noTfound = false;
                isFoudkc = true;
                isFoud = true;
                console.log('finish', kabkot[ikc].nama);
              }
            }
            ikc++;
            if (ikc >= kabkot.length) {
              noTfoundkc = false;
            }
          } while (noTfoundkc);
        }
        i++;
        if (i > province.length) {
          noTfound = false;
        }
      } while (noTfound);
      if (!isFoud) {
        logger.info('finish cronjob kec');
      }
    });
  }
  executeWorkerOperationKabkot() {
    cron.schedule(CRON.EVERY_5_SEC, async () => {
      logger.info('start cronjob');
      const province = await Province.find().lean();
      let noTfound = true;
      let i = 0;
      let isFoud = false;
      do {
        const kabkot = await Kabkot.count({ province: province[i]._id });
        console.log(i, province[i].nama);
        if (kabkot < 1) {
          console.log('found', province[i].nama);
          const axios = require('axios');
          let pem = await axios.get(
            'https://pemilu2019.kpu.go.id/static/json/wilayah/' +
              province[i].id +
              '.json'
          );
          let myMap = [];
          interface Kabkot {
            nama: String;
            dapil: String[];
          }
          for (const [key, value] of Object.entries(pem.data)) {
            let prov = <Kabkot>value;
            let objMap = {
              id: key,
              nama: prov.nama,
              dapil: prov.dapil,
              province: province[i]._id,
              id_province: province[i].id
            };
            const exInDb = await Kabkot.find({ id: key }).count();
            if (exInDb < 1) {
              myMap.push(objMap);
            }
          }
          await Kabkot.insertMany(myMap);
          noTfound = false;
          isFoud = true;
          console.log('finish', province[i].nama);
        }
        i++;
        if (i > province.length) {
          noTfound = false;
        }
      } while (noTfound);
      if (!isFoud) {
        logger.info('finish cronjob kabkot');
      }
    });
  }
  executeWorkerOperationKec() {
    cron.schedule(CRON.EVERY_2_SEC, async () => {
      logger.info('start cronjob');
      const province = await Province.find().lean();
      let noTfound = true;
      let i = 0;
      let isFoud = false;
      do {
        const kabkot = await Kabkot.find({ province: province[i]._id }).lean();
        console.log('Prov', i, province[i].nama);
        if (kabkot.length > 0) {
          let noTfoundkc = true;
          let ikc = 0;
          let isFoudkc = false;
          do {
            const kec = await Kecamatan.count({ kabkot: kabkot[ikc]._id });
            if (kec < 1) {
              console.log('found', ikc, kabkot[ikc].nama);
              const axios = require('axios');
              let pem = await axios.get(
                'https://pemilu2019.kpu.go.id/static/json/wilayah/' +
                  province[i].id +
                  '/' +
                  kabkot[ikc].id +
                  '.json'
              );
              let myMap = [];
              interface Kecamatan {
                nama: String;
                dapil: String[];
              }
              for (const [key, value] of Object.entries(pem.data)) {
                let prov = <Kecamatan>value;
                let objMap = {
                  id: key,
                  nama: prov.nama,
                  dapil: prov.dapil,
                  kabkot: kabkot[ikc]._id,
                  id_kabkot: kabkot[ikc].id
                };
                myMap.push(objMap);
              }
              const kecres = await Kecamatan.insertMany(myMap);
              noTfoundkc = false;
              noTfound = false;
              isFoudkc = true;
              isFoud = true;
              console.log('finish', kabkot[ikc].nama);
            }
            ikc++;
            if (ikc >= kabkot.length) {
              noTfoundkc = false;
            }
          } while (noTfoundkc);
        }
        i++;
        if (i > province.length) {
          noTfound = false;
        }
      } while (noTfound);
      if (!isFoud) {
        logger.info('finish cronjob kec');
      }
    });
  }
  executeWorkerOperationDes() {
    cron.schedule(CRON.EVERY_2_SEC, async () => {
      logger.info('start cronjob');
      const province = await Province.find().lean();
      let noTfound = true;
      let i = 0;
      let isFoud = false;
      do {
        if (!province[i].foundDesa) {
          const kabkot = await Kabkot.find({
            province: province[i]._id
          }).lean();
          if (kabkot.length > 0) {
            let noTfoundkc = true;
            let ikc = 0;
            let isFoudkc = false;
            do {
              if (!kabkot[ikc].foundDesa) {
                const kec = await Kecamatan.find({ kabkot: kabkot[ikc]._id });
                if (kec.length > 0) {
                  let noTfoundkcds = true;
                  let ikcds = 0;
                  let isFoudkcds = false;
                  do {
                    const desa = await Desa.count({
                      kecamatan: kec[ikcds]._id
                    });
                    if (desa < 1) {
                      console.log('found', kec[ikcds].nama);
                      const axios = require('axios');
                      let pem = await axios.get(
                        'https://pemilu2019.kpu.go.id/static/json/wilayah/' +
                          province[i].id +
                          '/' +
                          kabkot[ikc].id +
                          '/' +
                          kec[ikcds].id +
                          '.json'
                      );
                      let myMap = [];
                      interface Desa {
                        nama: String;
                        dapil: String[];
                      }
                      for (const [key, value] of Object.entries(pem.data)) {
                        let prov = <Desa>value;
                        let objMap = {
                          id: key,
                          nama: prov.nama,
                          dapil: prov.dapil,
                          kecamatan: kec[ikcds]._id,
                          id_kecamatan: kec[ikcds].id
                        };
                        myMap.push(objMap);
                      }
                      const desares = await Desa.insertMany(myMap);
                      noTfoundkcds = false;
                      noTfoundkc = false;
                      noTfound = false;
                      isFoudkcds = true;
                      isFoudkc = true;
                      isFoud = true;
                      console.log('finish', kec[ikcds].nama);
                    }
                    ikcds++;
                    if (ikcds >= kec.length) {
                      await Kabkot.updateMany(
                        { _id: kabkot[ikc]._id },
                        { $set: { foundDesa: true } }
                      );
                      noTfoundkcds = false;
                    }
                  } while (noTfoundkcds);
                }
              }
              ikc++;
              if (ikc >= kabkot.length) {
                await Province.updateMany(
                  { _id: province[i]._id },
                  { $set: { foundDesa: true } }
                );
                noTfoundkc = false;
              }
            } while (noTfoundkc);
          }
        }
        i++;
        if (i >= province.length) {
          noTfound = false;
        }
      } while (noTfound);
      if (!isFoud) {
        logger.info('finish cronjob kec');
      }
    });
  }

  ///sync between user
}
