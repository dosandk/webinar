import {indexedDBService} from './index';

export const read = () => {
  return indexedDBService
    .open()
    .then(() => indexedDBService.read());
};

export const save = value => indexedDBService.save(value);

export const remove = id => indexedDBService.remove(id);

export const removeAll = () => indexedDBService.removeAll();