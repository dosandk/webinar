const dbName = 'todo';
const storeName = 'toDoList';
const version = 1;
const tasksList = [];
let db = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

export const indexedDBService = {
  getStore () {
    return db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName);
  },
  open () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

      request.onupgradeneeded = e =>
        e.currentTarget.result.createObjectStore(storeName, { autoIncrement: true });
      request.onsuccess = () => resolve(db = request.result);
      request.onerror = err => reject(err);
    });
  },
  save (value) {
    return new Promise((resolve, reject) => {
      const request = this.getStore().add(value);

      request.onsuccess = e => {
        tasksList.push({
          key: e.target.result.key,
          value: value
        });
        resolve();
      };
      request.onerror = err => reject(err);
    });
  },
  read () {
    return this.open().then(() => {
      return new Promise((resolve, reject) => {
        const cursor = this.getStore().openCursor();

        cursor.onsuccess = e => {
          const result = e.target.result;

          if (result) {
            tasksList.push({
              key: result.key,
              value: result.value
            });
            result.continue();
          } else {
            resolve(tasksList.map(item => item.value));
          }
        };
        cursor.onerror = err => reject(err);
      });
    });
  },
  remove (value) {
    return new Promise((resolve, reject) => {
      const cursor = this.getStore().openCursor();

      cursor.onsuccess = e => {
        const result = e.target.result;

        if ( result.value === value ) {
          const request = result.delete();
          request.onsuccess = () => resolve();
        }
      };
      cursor.onerror = err => reject(err);
    });
  },
  removeAll () {
    return new Promise((resolve, reject) => {
      const request = this.getStore().clear();

      request.onsuccess = () => resolve();
      request.onerror = err => reject(err);
    });
  }
};
