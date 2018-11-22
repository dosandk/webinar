const indexedDB = window.indexedDB || window.mozIndexedDB ||
     window.webkitIndexedDB || window.msIndexedDB;

const baseName = 'ELEKSCamp';
const storeName = 'ToDoList';
const DBOptions = { autoIncrement : true };
const version = 5;

export const indexedDBService = { 

  read ()  { 
    const DBOpenRequest = indexedDB.open(baseName, version);
 
    DBOpenRequest.onupgradeneeded = event => {
      event.target.result.createObjectStore(storeName, DBOptions);
    };

    return new Promise((res, rej) =>{       
      DBOpenRequest.onsuccess = () => {
        DBOpenRequest.result
          .transaction([storeName], 'readonly')
          .objectStore(storeName)
          .getAll()
          .onsuccess = event => {       
            res(event.target.result);
            rej();
          };       
      };
    });    
  },

  save (item)  {
    const DBOpenRequest = indexedDB.open(baseName, version);

    DBOpenRequest.onupgradeneeded = event => {
      event.target.result.createObjectStore(storeName, DBOptions);
    };
    DBOpenRequest.onsuccess = () => {  
      DBOpenRequest.result
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .add(item);
    };
  },

  remove (item) {
    const DBOpenRequest = indexedDB.open(baseName, version);

    DBOpenRequest.onsuccess = () => {       
      const store = DBOpenRequest.result
        .transaction([storeName], 'readwrite')
        .objectStore(storeName);          
      const getAllKeysRequest = store.getAllKeys();      
      getAllKeysRequest.onsuccess = () => {        
        store.getAll().onsuccess = event => {
          const index = event.target.result.indexOf(item);
          const key = getAllKeysRequest.result[index];
          store.delete(key);
        };
      };     
    };
  },

  removeAll () {
    const DBOpenRequest = indexedDB.open(baseName, version);

    DBOpenRequest.onsuccess = () => {       
      const store = DBOpenRequest.result
        .transaction([storeName], 'readwrite')
        .objectStore(storeName);          
      const getAllKeysRequest = store.getAllKeys();      
      getAllKeysRequest.onsuccess = () => {        
        getAllKeysRequest.result.forEach(key => {
          store.delete(key);
        });
      };     
    };
  },  
};