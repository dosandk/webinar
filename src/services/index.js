import * as cookieAdapter from './cookie/adapter';
import * as localStorageAdapter from './local-storage/adapter';
import * as sessionStorageService from './session-storage/adapter';
import {mLabService} from './mLab';
import indexDbService from './index-db';

import serviceTypes from './serviceTypes';

const adapters = {
  [serviceTypes.cookie]: cookieAdapter,
  [serviceTypes.localStorage]: localStorageAdapter,
  [serviceTypes.mLab]: mLabService,
  [serviceTypes.sessionStorage]: sessionStorageService,
  [serviceTypes.indexDb]: indexDbService,
};

const defaultAdapter = adapters[serviceTypes.localStorage];

export const getAdapter = name => {
  const adapter = adapters[name] || defaultAdapter;

  return adapter;
};
