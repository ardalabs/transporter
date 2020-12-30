import { CONFIG } from '@util/config/config';
import { logger } from '@util/logger/logger';
import connectRedis from 'connect-redis';
import session from 'express-session';
import redis, { RedisClient } from 'redis';

const RedisStore = connectRedis(session);

const redisClient = redis.createClient(
  Number(CONFIG.REDIS_PORT),
  CONFIG.REDIS_URL,
  { password: CONFIG.REDIS_PASS }
);

interface ICacheManager {
  setCache(key: string, data: any, deltaTime?: number): void;
  deleteKey(key: string): void;
  flushAllKey(): void;
}
export class ArdaCacheManager implements ICacheManager {
  private url: string;
  private password: string;
  private cache: any;
  private port: number;
  constructor(url?: string, port?: number) {
    this.url = url ? url : CONFIG.REDIS_URL;
    this.password = CONFIG.REDIS_PASS;
    this.port = Number(port ? port : CONFIG.REDIS_PORT);
  }
  performSendNotificationPayload(key?: string, params?: any): void {
    if (key === 'FLUSH') {
      this.flushAllKey();
    }
  }

  setCache(key: string, data: any, deltaTime?: number): void {
    redisClient.auth(CONFIG.REDIS_PASS);
    redisClient.setex(key, deltaTime ? deltaTime : 3600, JSON.stringify(data));
  }

  getCache(key: string, callback: (err: Error, result: any) => void) {
    redisClient.get(key, (err, result) => {
      if (!err) {
        return callback(null, result);
      } else {
        return callback(err, null);
      }
    });
  }
  flushAllKey(): void {
    redisClient.flushall();
  }
  deleteKey(key: string): void {
    const evalRedis = // little fancy atomic lua script based on
      // http://stackoverflow.com/a/16974060/3202588
      'local keysToDelete = redis.call(\'keys\', ARGV[1]) ' + // find keys with wildcard
      'if unpack(keysToDelete) ~= nil then ' + // if there are any keys
      'return redis.call(\'del\', unpack(keysToDelete)) ' + // delete all
      'else ' +
      'return 0 ' + // if no keys to delete
      'end ';

    redisClient.eval(
      evalRedis,
      0, // no keys names passed, only one argument ARGV[1]
      key,
      (_err: any, _res: any) => {
        if (_err) {
          logger.info(
            `success delete cache with key ${key} with err message ${_err}`
          );
          return;
        }
        logger.info(`success delete cache with key ${key}`);
      }
    );
  }
}
