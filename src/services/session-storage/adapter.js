//import {sessionStor} from './index';

const sessionStor = {
  write (key, value) {
    sessionStorage.setItem(key, value);
  },
  read (key) {
    return sessionStorage.getItem(key);
  },
  remove (key) {
    sessionStorage.removeItem(key);
  },
  removeAll () {
    sessionStorage.clear();
  }
};

export const remove = value => {
  //const currentCookie = sessionStor.read('todo');
  const cookie = sessionStor.read('todo')
    .split('&')
    .filter(item => item !== value)
    .join('&');

  sessionStor.write('todo', cookie);
};

export const save = value => {
  const currentCookie = sessionStor.read('todo');
  const currentValue = currentCookie ? `${currentCookie}&` : '';

  sessionStor.write('todo', `${currentValue}${value}`);
};

export const read = () => {
  const result = sessionStor.read('todo');

  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};

export const removeAll = () => {
  sessionStor.remove('todo');
};