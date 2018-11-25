import * as cookieAdapter from './cookie/adapter';
import StorageAdapter from './storage/adapter';
import {mLabService} from './mLab';
import IndexedDBAdapter from './index-db/adapter';

const adapters = {
  cookie: cookieAdapter,
  localStorage: new StorageAdapter('localStorage', 'todo'),
  sessionStorage: new StorageAdapter('sessionStorage', 'todo'),
  mLab: mLabService,
  indexedDB: new IndexedDBAdapter('todo', 'todolist')
};

export const getAdapter = name => {
  return adapters[name];
};
