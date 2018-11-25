import {indexedDBService} from './index';
export const remove = (value, index) => {
  indexedDBService.remove(index);
};

export const save = value => {
  indexedDBService.write(value);
};

export const read = () => {
  const result = indexedDBService.read();
  return result ? Promise.resolve(result) : Promise.resolve([]);
};

export const removeAll = () => {
  indexedDBService.removeAll();
};
