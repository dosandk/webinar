import {IndexedDBService} from './index';

export const remove = value => {
  const currentCookie = IndexedDBService.read('todo');
  const cookie = currentCookie
    .split('&')
    .filter(item => item !== value)
    .join('&');

  IndexedDBService.write('todo', cookie);
};

export const save = value => {
  const currentCookie = IndexedDBService.read('todo');
  const currentValue = currentCookie ? `${currentCookie}&` : '';

  IndexedDBService.write('todo', `${currentValue}${value}`);
};

export const read = () => {
  const result = IndexedDBService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = () => {
  IndexedDBService.removeAll();
};
