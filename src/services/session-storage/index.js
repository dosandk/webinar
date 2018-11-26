export const sessionStorageService = {
  write (key, value) {
    const data = this.read(key);

    data.push(value);
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  read (key) {
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : [];
  },
  remove (key, value) {
    const data = this.read(key);
    const newData = data.filter(item => item !== value);

    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, JSON.stringify(newData));
  },
  removeAll (key) {
    sessionStorage.removeItem(key);
  }
};
