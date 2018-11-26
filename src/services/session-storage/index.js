const sessionStorageService = {
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
export default sessionStorageService;
