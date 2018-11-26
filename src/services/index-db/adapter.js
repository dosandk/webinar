import {indexDBService} from './index';

export const remove = value => {
  indexDBService.remove('todo', value);
};

export const save = value => {
  indexDBService.write('todo', value);
};

export const read = () => {
  const result = indexDBService.read('todo');

  return result.then( val => {
    return val.map(item => item.value);
  });
};

export const removeAll = () => {
  indexDBService.removeAll();
};
