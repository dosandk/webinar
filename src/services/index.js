import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import {mLabService} from './mLab';
import {indexDB, indexDbAdapter} from "./index-db";

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  indexDB: indexDbAdapter
};

export const getAdapter = name => {
  return adapters[name];
};
