import { sessionStorageService } from './index';

export const remove = async value => {
  try {
    const currentSession = sessionStorageService.read('todo');
    const session = currentSession
      .split('&')
      .filter(item => item !== value)
      .join('&');

    return sessionStorageService.write('todo', session);
  } catch (e) {
    throw (e);
  }
};

export const save = async value => {
  try {
    const currentSession = sessionStorageService.read('todo');
    const currentValue = currentSession ? `${currentSession}&` : '';

    return sessionStorageService.write('todo', `${currentValue}${value}`);
  } catch (e) {
    throw (e);
  }
};

export const read = () => {
  const result = sessionStorageService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = async () => {
  try {
    return sessionStorageService.remove('todo');
  } catch (e) {
    throw (e);
  }
};
