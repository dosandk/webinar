import {indexDbService} from './index';

export const remove = value => {
  indexDbService.remove(value);
};

export const save = value => {
  indexDbService.save(value);
};

export const read = () => {
  const result = indexDbService.read('todo');
  return result.then(value => {
    return value;
  });
};

export const removeAll = () => {
  indexDbService.removeAll();
};