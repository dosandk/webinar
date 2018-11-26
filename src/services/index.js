import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import { mLabService } from './mLab';
import { indexedDBService } from './index-db';

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  sessionStorage: sessionStorageAdapter,
  mLab: mLabService,
  indexedDb: indexedDBService
};

export const getAdapter = name => {
  return adapters[name];
};
