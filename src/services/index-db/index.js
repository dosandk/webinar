import idb from 'idb';

const store = 'tasks';
const mode = 'readwrite';

if (!('indexedDB' in window)) {
  console.error('This browser doesn\'t support IndexedDB');
}

const dbPromise = idb.open('maruv-store', 1, upgradeDB => {
  upgradeDB.createObjectStore(store);
});

const idbKeyval = {
  get (key) {
    return dbPromise.then(db => {
      return db.transaction(store)
        .objectStore(store).get(key);
    });
  },
  set (key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction(store, mode);
      tx.objectStore(store).put(val, key);
      return tx.complete;
    });
  },
  delete (key) {
    return dbPromise.then(db => {
      const tx = db.transaction(store, mode);
      tx.objectStore(store).delete(key);
      return tx.complete;
    });
  },
  clear () {
    return dbPromise.then(db => {
      const tx = db.transaction(store, mode);
      tx.objectStore(store).clear();
      return tx.complete;
    });
  }
};

export const IndexedDBService = {
  
  write (key, value) {
    idbKeyval.set(key, value);
  },
  read (key) {
    idbKeyval.get(key);
  },
  remove (key) {
    idbKeyval.delete(key);
  },
  removeAll () {
    idbKeyval.clear();
  }
};
