export enum APISTATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INVALID_REQUEST = 'Invalid Request',
  STATUS_AUTH_NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  STATUS_AUTH_NOT_AUTHORIZED_MESSAGE = 'Tidak terautorisasi, silahkan logout kemudian login lagi',
  STATUS_BASIC_AUTH_INVALID = 'Invalid Authentication Credentials',
  STATUS_BASIC_AUTH_MISSING = 'Missing Authorization Header'
}
export enum CRON {
  EVERY_5_SEC = '*/5 * * * * *',
  EVERY_15_SEC = '*/15 * * * * *',
  EVERY_1_MIN = '*/1 * * * *',
  EVERY_5_MIN = '*/5 * * * *',
  EVERY_10_MIN = '*/10 * * * *',
  EVERY_30_MIN = '*/30 * * * *',
  EVERY_1_HOUR = '0 * * * *',
  EVERY_2_HOUR = '0 */2 * * *',
  EVERY_3_HOUR = '0 */2 * * *',
  EVERY_6_HOUR = '0 */6 * * *',
  EVERY_11_NIGHT = '59 23 * * *',
  EVERY_MIDNIGHT = '0 0 * * *'
}
export enum API_VERSION {
  V1 = 'v1'
}
