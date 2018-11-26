import {indexDbService} from './index';

export const remove = value => {
  indexDbService.remove('todo', value);
};

export const save = value => {
  indexDbService.write('todo', value);
};

export function read () {
  const result = indexDbService.read('todo');

  return Promise.resolve(result);
}

export const removeAll = () => {
  indexDbService.removeAll('todo');
};


