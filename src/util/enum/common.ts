export enum APISTATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INVALID_REQUEST = 'Invalid Request',
  STATUS_AUTH_NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  STATUS_AUTH_NOT_AUTHORIZED_MESSAGE = 'Tidak terautorisasi, silahkan logout kemudian login lagi',
  STATUS_BASIC_AUTH_INVALID = 'Invalid Authentication Credentials',
  STATUS_BASIC_AUTH_MISSING = 'Missing Authorization Header'
}

export enum API_VERSION {
  V1 = 'v1'
}