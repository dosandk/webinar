export const indexedDBService = {
  write (key, value) {
    indexedDB.setItem(key, value);
  },
  read (key) {
    return indexedDB.getItem(key);
  },
  remove (key) {
    indexedDB.removeItem(key);
  },
  removeAll () {
    indexedDB.clear();
  }
};
