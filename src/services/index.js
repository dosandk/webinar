import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import {mLabService} from './mLab';
import * as indexDBAdapter from './index-db/adapter';
import * as sessionAdapter from './session-storage/adapter';
const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  indexDB: indexDBAdapter,
  session:sessionAdapter
};

export const getAdapter = name => {
  return adapters[name];
};
