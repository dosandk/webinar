import {indexDbService} from './index';

export const read = () => {
  return indexDbService.read();
};

export const remove = value => {
  return indexDbService.remove(value);
};

export const removeAll = () => {
  return indexDbService.removeAll();
};

export const save = value => {
  return indexDbService.save(value);
};
