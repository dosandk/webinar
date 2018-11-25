import idb from 'idb';

export default class IndexedDBAdapter {
  constructor (dbName, storeName) {
    this.dbName = dbName;
    this.storeName = storeName;

    this.dbPromise = idb.open(this.dbName, 1, upgradeDB => {
      upgradeDB.createObjectStore(this.storeName);
    });

    this.read = () => {
      return this.dbPromise.then(db => {
        return db.transaction(this.storeName)
          .objectStore(this.storeName).getAll();
      });
    };

    this.save = val => {
      return this.dbPromise.then(db => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put(val, val);
        return tx.complete;
      });
    };

    this.remove = val => {
      return this.dbPromise.then(db => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).delete(val);
        return tx.complete;
      });
    };

    this.removeAll = () => {
      return this.dbPromise.then(db => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).clear();
        return tx.complete;
      });
    };
  }
}




