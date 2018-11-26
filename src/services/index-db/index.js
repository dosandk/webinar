import idb from 'idb';

export const indexDBService = {
  initialized: false,
  dbPromise: null,
  initialize () {
    if (!('indexedDB' in window)) {
      return;
    }
    this.dbPromise = idb.open('webinar', 1, upgradeDb => {
      if (!upgradeDb.objectStoreNames.contains('todo')) {
        upgradeDb.createObjectStore('todo', {keyPath: 'id'});
      }
    });
    this.initialized = true;
  },
  write (table, value) {
    if (!this.initialized) {
      this.initialize();
    }

    this.dbPromise.then( db => {
      const tx = db.transaction(table, 'readwrite');
      const store = tx.objectStore(table);
      store.add({id: value, value: value});
      return tx.complete;
    });
  },
  read (table) {
    if (!this.initialized) {
      this.initialize();
    }

    const result = this.dbPromise.then(db => {
      const tx = db.transaction(table, 'readonly');
      const store = tx.objectStore(table);
      return store.getAll();
    });

    return result;
  },
  remove (table, key) {
    this.dbPromise.then(db => {
      const tx = db.transaction(table, 'readwrite');
      tx.objectStore(table).delete(key);
      return tx.complete;
    });
  },
  removeAll () {
    idb.delete('webinar');
  }
};
