import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as indexedDBAdapter from './index-db/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import {mLabService} from './mLab';

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  indexedDB: indexedDBAdapter,
  sessionStorage: sessionStorageAdapter
};

export const getAdapter = name => {
  return adapters[name];
};
