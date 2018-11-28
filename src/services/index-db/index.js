import idb from 'idb';
 
export const indexDbService = {
  initStatus: false,
  dbPromise: null,
  init () {
    this.dbPromise = idb.open('dbStore', 1, upgradeDB => {
      if (!upgradeDB.objectStoreNames.contains('dbStore')){
        upgradeDB.createObjectStore('todo', {autoIncrement: true});
      }
    });
    this.initStatus = true;
  },
  checkInit () {
    if (!this.initStatus){
      this.init();
    }
  },
  read () {
    this.checkInit();
    return this.dbPromise.then(db => {
      return db.transaction('todo', 'readonly')
        .objectStore('todo').getAll();
    });
  },
  save (value) {
    this.checkInit();
    return this.dbPromise.then(db => {
      const tx = db.transaction('todo', 'readwrite');
      tx.objectStore('todo').add(value);
      return tx.complete;
    });
  },
  remove (key) {
    return this.dbPromise.then(db => {
      const tx = db.transaction('todo', 'readwrite');
      tx.objectStore('todo').delete(key);
      return tx.complete;
    });
  },
  removeAll () {
    return this.dbPromise.then(db => {
      const tx = db.transaction('todo', 'readwrite');
      tx.objectStore('todo').clear();
      return tx.complete;
    });
  }
};