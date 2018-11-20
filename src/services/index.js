import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import { mLabService } from './mLab';
import { indexDBService } from './index-db';

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  indexDB: indexDBService,
  sessionStorage: sessionStorageAdapter
};

export const getAdapter = name => {
  return adapters[name];
};
