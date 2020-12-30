import { Kernel } from './arda.core';
import mongoose from 'mongoose';
import { logger } from '@util/logger/logger';

export interface IRepository {
  model: mongoose.Model<mongoose.Document>;
  delete(data?: any): Promise<any>;
  replaceOne(data?: any, replacement?: any): Promise<any>;
  findAll(
    data?: any,
    params?: any,
    skip?: number,
    limit?: number
  ): Promise<any>;
  findById(id: string, params?: any): Promise<any>;
  findByIdAndUpdate(id: string, params?: any): Promise<any>;
  findOneAndUpdate(id: string, params?: any, options?: any): Promise<any>;
  create(data: [any]): Promise<any>;
  createMany(data: any): Promise<any>;
  count(data?: any): Promise<any>;
  updateMany(data?: any, params?: any, options?: any): Promise<any>;
  update(data?: any, params?: any, options?: any): Promise<any>;
  findLatest(data: any, params?: any): Promise<any>;
  findOne(
    data?: any,
    params?: any,
    skip?: number,
    limit?: number
  ): Promise<any>;
  aggregate(data?: any): Promise<any>;
}


interface IArdaStorage {
  connect(): void;
}
export class ArdaStorage extends Kernel implements IArdaStorage {
  connect(): void {
    logger.info('arda storage initialized');
    const env = process.env.NODE_ENV;
    if (env === 'development' || env === 'local') {
      mongoose.set('debug', true);
    }
    mongoose.Promise = global.Promise;
    mongoose.set('useUnifiedTopology', true);
    mongoose
      .connect(this.dbUrl, {
        useNewUrlParser: true
      })
      .then((data: any) => {
        logger.info('Connected');
      })
      .catch((err) => {
        logger.error('Not Connected to Database ERROR! ', err);
      });
  }
}


// tslint:disable-next-line: max-classes-per-file
export class QueryProxy implements IRepository {
  public model: mongoose.Model<mongoose.Document>;

  constructor(modelName: mongoose.Model<mongoose.Document>) {
    this.model = modelName;
  }

  public async deleteMany(data?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.deleteMany(data);
      q.exec((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return p;
  }

  public async updateMany(
    data?: any,
    params?: any,
    options?: any
  ): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.updateMany(data, params, options);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return p;
  }

  public async update(data?: any, params?: any, options?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.update(data, params, options);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          logger.info(result);
          resolve(result);
        }
      });
    });
    return p;
  }

  public async delete(data?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.remove(data);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          logger.info(result);
          resolve(result);
        }
      });
    });
    return p;
  }

  public async count(data?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.countDocuments(data);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return p;
  }

  public async replaceOne(data?: any, replacement?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.replaceOne(data, replacement);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return p;
  }

  public async findLatest(data: any, params?: any): Promise<any> {
    const p = new Promise(async (resolve, reject) => {
      const q = this.model
        .find(data)
        .populate(params.populate ? params.populate : '')
        .maxTimeMS(300000)
        // tslint:disable-next-line: no-empty
        .skip((await this.model.count({}, (_e: any, _c: any) => {})) - 1)
        .select(params.filter ? params.filter : '');
      q.setOptions({
        lean: params.lean ? params.lean : false
      });
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          if (result.length) {
            resolve(result[0]);
          } else {
            logger.info(result);
            resolve({});
          }
        }
      });
    });
    return p;
  }

  public async findById(id: string, params?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model
        .findById(id)
        .populate(params.populate ? params.populate : '')
        .maxTimeMS(300000)
        .lean(true)
        .select(params.filter ? params.filter : '');
      q.setOptions({
        lean: params.lean ? params.lean : false
      });
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          logger.info(result);
          resolve(result);
        }
      });
    });
    return p;
  }

  public async findByIdAndUpdate(id: string, params?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.findByIdAndUpdate(id, params);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          logger.info(result);
          resolve(result);
        }
      });
    });
    return p;
  }

  public async findOneAndUpdate(
    data: any,
    params?: any,
    options?: any
  ): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.findOneAndUpdate(data, params, options);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          logger.info(result);
          resolve(result);
        }
      });
    });
    return p;
  }

  public async create(data: any): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    const p = new Promise((resolve, reject) => {
      const q = new this.model(data);
      q.save((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return p;
  }

  public async createMany(_data: any): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    const p = new Promise((resolve, reject) => {
      const q = this.model.insertMany(_data);
      q.then((data: any) => {
        resolve(data);
      });

      q.catch((error: any) => {
        reject(error);
      });
    });
    return p;
  }

  public async findOne(
    data?: any,
    params?: any,
    _skip?: number,
    _limit?: number
  ): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model
        .findOne(data)
        .maxTimeMS(300000)
        .populate(params.populate ? params.populate : '')
        .select(params.selected ? params.selected : '');
      q.setOptions({
        lean: params.lean ? params.lean : true
      });
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return p;
  }

  public async aggregate(data?: any): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.aggregate(data);
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return p;
  }

  public async findAll(
    data?: any,
    params?: any,
    skip?: number,
    limit?: number
  ): Promise<any> {
    const p = new Promise((resolve, reject) => {
      const q = this.model.find(data);
      q.sort(params.sort ? params.sort : '');
      q.limit(limit ? limit : 10);
      q.skip(skip ? skip : 0);
      q.populate(params.populate ? params.populate : '');
      q.select(params.selected ? params.selected : '');
      q.setOptions({
        lean: params.lean ? params.lean : true
      });
      q.exec((err, result) => {
        if (err) {
          logger.info(err);
          reject(err);
        } else {
          // logger.info(result)
          resolve(result);
        }
      });
    });
    return p;
  }
}
export default QueryProxy;

