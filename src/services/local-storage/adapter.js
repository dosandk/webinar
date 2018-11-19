import { localStorageService } from './index';

export const remove = async value => {
  try {
    const currentCookie = localStorageService.read('todo');
    const cookie = currentCookie
      .split('&')
      .filter(item => item !== value)
      .join('&');

    return localStorageService.write('todo', cookie);
  } catch (e) {
    throw (e);
  }
};

export const save = async value => {
  try {
    const currentCookie = localStorageService.read('todo');
    const currentValue = currentCookie ? `${currentCookie}&` : '';

    return localStorageService.write('todo', `${currentValue}${value}`);
  } catch (e) {
    throw (e);
  }
};

export const read = () => {
  const result = localStorageService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = async () => {
  try {
    return localStorageService.remove('todo');
  } catch (e) {
    throw (e);
  }
};
