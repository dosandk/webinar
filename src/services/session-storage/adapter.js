import { sessionStorageService } from './index';

export const remove = value => {
  const currentSession = sessionStorageService.read('todo');
  const session = currentSession
    .split('&')
    .filter(item => item !== value)
    .join('&');

  sessionStorageService.write('todo', session);
};

export const save = value => {
  const currentSession = sessionStorageService.read('todo');
  const currentValue = currentSession ? `${currentSession}&` : '';

  sessionStorageService.write('todo', `${currentValue}${value}`);
};

export const read = () => {
  const result = sessionStorageService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = () => {
  sessionStorageService.remove('todo');
};
