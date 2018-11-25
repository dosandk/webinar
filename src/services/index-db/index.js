export const indexedDBService = {
  openDB () {
    return new Promise(function (resolve) {
      const request = indexedDB.open('todo', 1);
      
      request.onerror = event => {
        console.error(event.target.errorCode);
      };
    
      request.onsuccess = () => {
        return resolve(request.result);
      };

      request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore('value', { autoIncrement: true  });
      };
    });
  },
  write (value) {
    Promise.resolve(indexedDBService.openDB()).then( db => {
      const transaction = db.transaction(['value'], 'readwrite');
      const objectStore = transaction.objectStore('value');
      objectStore.add(value);
    });
  },

  read () {
    return new Promise(function (resolve) {
      Promise.resolve(indexedDBService.openDB()).then( db => {
        const result = [];
        const objectStore = db.transaction('value').objectStore('value');
        objectStore.openCursor().onsuccess = event => {
          const cursor = event.target.result;
          if (cursor) {
            result.push(cursor.value);
            cursor.continue();
          } else {
            return resolve(result);
          }
        };
      });
    });
  },

  remove (index) {
    Promise.resolve(indexedDBService.openDB()).then( db => {
      const transaction = db.transaction(['value'], 'readwrite');
      const objectStore = transaction.objectStore('value');
      const getAllKeysRequest = objectStore.getAllKeys();
      getAllKeysRequest.onsuccess = function () {
        const keys = getAllKeysRequest.result;
        objectStore.delete(keys[index]);
      };
    });
  },

  removeAll () {
    Promise.resolve(indexedDBService.openDB()).then( db => {
      const transaction = db.transaction(['value'], 'readwrite');
      const objectStore = transaction.objectStore('value');
      objectStore.clear();
    });
  }
};