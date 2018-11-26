import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import {mLabService} from './mLab';
import * as indexDbAdapter from "./index-db";
import * as sessionStorageService from "./session-storage";

const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  mLab: mLabService,
  indexDB: indexDbAdapter,
  sessionStorageService: sessionStorageService
};

export const getAdapter = name => {
  return adapters[name];
};
