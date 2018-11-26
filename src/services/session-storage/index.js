export const sessionStorageService = {
  read: key => sessionStorage.getItem(key),
  write: (key, value) => sessionStorage.setItem(key, value),
  remove: key => sessionStorage.removeItem(key),
  removeAll: () => sessionStorage.clear()
};
