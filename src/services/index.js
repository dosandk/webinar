import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import {mLabService} from './mLab';
import * as sessionStorageAdapter from './session-storage/adapter';
import * as indexDbAdapter from './index-db/adapter';

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  sessionStorage: sessionStorageAdapter,
  indexDb: indexDbAdapter
};

export const getAdapter = name => {
  return adapters[name];
};
