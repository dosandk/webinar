import { cookieService } from './index';

export const remove = async value => {
  try {
    const currentCookie = cookieService.read('todo');
    const cookie = currentCookie
      .split('&')
      .filter(item => item !== value)
      .join('&');

    return cookieService.write('todo', cookie);
  } catch (e) {
    throw (e);
  }
};

export const save = async value => {
  try {
    const currentCookie = cookieService.read('todo');
    const currentValue = currentCookie ? `${currentCookie}&` : '';

    return cookieService.write('todo', `${currentValue}${value}`);
  } catch (e) {
    throw (e);
  }
};

export const read = () => {

  const result = cookieService.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = async () => {
  try {
    return cookieService.remove('todo');
  } catch (e) {
    throw (e);
  }
};
