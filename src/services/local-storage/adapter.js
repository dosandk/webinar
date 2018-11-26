import {localStorageService} from './index';

export const remove = value => {
  const currentCookie = localStorageService.read('todo');
  const cookie = currentCookie
    .split('&')
    .filter(item => item !== value)
    .join('&');
  localStorageService.write('todo', cookie);
};

export const save = value => {
  const currentCookie = localStorageService.read('todo');
  const currentValue = currentCookie ? `${currentCookie}&` : '';

  localStorageService.write('todo', `${currentValue}${value}`);
};

export const read = () => {
  const result = localStorageService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = () => {
  localStorageService.remove('todo');
};
