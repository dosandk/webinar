import * as cookieAdapter from './cookie/adapter';
import * as indexDbService from './index-db/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import {mLabService} from './mLab';

const adapters = {
  cookie: cookieAdapter,
  indexDb: indexDbService,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  sessionStorage: sessionStorageAdapter,
};

export const getAdapter = name => {
  return adapters[name];
};
