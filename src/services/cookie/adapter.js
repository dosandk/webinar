import {cookieService} from './index';

export const remove = value => {
  const currentCookie = cookieService.read('todo');
  const cookie = currentCookie
    .split('&')
    .filter(item => item !== value)
    .join('&');

  cookieService.write('todo', cookie);
};

export const save = value => {
  const currentCookie = cookieService.read('todo');
  const currentValue = currentCookie ? `${currentCookie}&` : '';

  cookieService.write('todo', `${currentValue}${value}`);
};

export const read = () => {
  const result = cookieService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = () => {
  cookieService.remove('todo');
};
