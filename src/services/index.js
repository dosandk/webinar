import * as cookieAdapter from './cookie/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import {mLabService} from './mLab';

const adapters = {
  cookie: cookieAdapter,
  sessionStorage: sessionStorageAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService
};

export const getAdapter = name => {
  return adapters[name];
};
