import {sessionStorageService} from './index';

export const remove = value => {
  sessionStorageService.remove('todo', value);
};

export const save = value => {
  sessionStorageService.write('todo', value);
};

export const read = () => {
  const data = sessionStorageService.read('todo');

  return Promise.resolve(data);
};

export const removeAll = () => {
  sessionStorageService.removeAll('todo');
};
