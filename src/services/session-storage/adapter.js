import sessionStorageService from './index';

const dbName = 'tasks';

function getCurrentCookie () {
  return sessionStorageService.read(dbName);
}

export const remove = value => {
  const currentCookie = getCurrentCookie();
  const cookie = currentCookie
    .split('&')
    .filter(item => item !== value)
    .join('&');
  sessionStorageService.write(dbName, cookie);
};
export const save = value => {
  const currentCookie = getCurrentCookie ();
  const currentValue = currentCookie ? `${currentCookie}&` : '';
  sessionStorageService.write(dbName, `${currentValue}${value}`);
};
export const read = () => {
  const result = getCurrentCookie();
  return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
};
export const removeAll = () => {
  sessionStorageService.remove(dbName);
};
