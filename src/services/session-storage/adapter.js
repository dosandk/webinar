import {SessionStorageService} from './index';

export const remove = value => {
  const currentCookie = SessionStorageService.read('todo');
  const cookie = currentCookie
    .split('&')
    .filter(item => item !== value)
    .join('&');

  SessionStorageService.write('todo', cookie);
};

export const save = value => {
  const currentCookie = SessionStorageService.read('todo');
  const currentValue = currentCookie ? `${currentCookie}&` : '';

  SessionStorageService.write('todo', `${currentValue}${value}`);
};

export const read = () => {
  const result = SessionStorageService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = () => {
  SessionStorageService.remove('todo');
};
