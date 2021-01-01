import { CONFIG } from '@util/config/config';
import { APISTATUS } from '@util/enum';
import express from 'express';

export default async function basicAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (
    req.path === '/app/ping' ||
    req.path === '/app/stellar' ||
    req.path === '/app/m/hook'
  ) {
    next();
  } else {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf('Basic ') === -1
    ) {
      return res
        .status(401)
        .json({ message: APISTATUS.STATUS_BASIC_AUTH_MISSING });
    }
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii'
    );
    const [username, password] = credentials.split(':');
    const user: boolean = authCheck(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: APISTATUS.STATUS_BASIC_AUTH_INVALID });
    }
    next();
  }
}

function authCheck(username: string, password: string): boolean {
  if (username !== CONFIG.BASIC_AUTH_USERNAME) {
    return false;
  }
  if (password !== CONFIG.BASIC_AUTH_PASSWORD) {
    return false;
  }
  return true;
}
