import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import {mLabService} from './mLab';
import * as sessionStor from './session-storage/adapter';
import * as indexDbAdapter from './index-db/adapter';

const adapters = {
  sessionStorage: sessionStor,
  indexDb: indexDbAdapter,
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService
};

export const getAdapter = name => {
  return adapters[name];
};
