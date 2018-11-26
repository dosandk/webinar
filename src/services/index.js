import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import * as indexDBAdapter from './index-db/index';
import {mLabService} from './mLab';

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  sessionStorage: sessionStorageAdapter,
  indexDB: indexDBAdapter
};

export const getAdapter = name => {
  return adapters[name];
};
