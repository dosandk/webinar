import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageAdapter from './session-storage/adapter';
import {mLabService} from './mLab';
import {indexedDbService} from './index-db';

export const adapters = {
  cookie: cookieAdapter,
  localStorage: localStorageAdapter,
  sessionStorage: sessionStorageAdapter,
  mLab: mLabService,
  indexedDb: indexedDbService
};
