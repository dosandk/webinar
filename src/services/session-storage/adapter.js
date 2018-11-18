import {sessionStorageService} from './index';

export const remove = value => {
  const currentCookie = sessionStorageService.read('todo');
  const cookie = currentCookie
    .split('&')
    .filter(item => item !== value)
    .join('&');

  sessionStorageService.write('todo', cookie);
};

export const save = value => {
  const currentCookie = sessionStorageService.read('todo');
  const currentValue = currentCookie ? `${currentCookie}&` : '';

  sessionStorageService.write('todo', `${currentValue}${value}`);
};

export const read = async () => {
  const result = await sessionStorageService.read('todo');

  return result ? result.split('&') : [];
};

export const removeAll = () => {
  sessionStorageService.remove('todo');
};
