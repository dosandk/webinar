import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import * as indexDbAdapter from './index-db';
import { mLabService } from './mLab';

const adapters = {
  cookie: cookieAdapter,
  indexDb: indexDbAdapter,
  localStorage: localStorageAdapter,
  sessionStorage: sessionStorageAdapter,
  mLab: mLabService
};

export const getAdapter = name => {
  return adapters[name];
};
