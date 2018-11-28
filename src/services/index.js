import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import * as indexDbAdapter from './index-db/adapter';

import {mLabService} from './mLab';

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  sessionStorage: sessionStorageAdapter,
  indexDb: indexDbAdapter,
  mLab: mLabService
};

export const getAdapter = name => {
  return adapters[name];
};
