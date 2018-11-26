import idb from 'idb';

const dbOpen = idb.open('todoDB', 1, upgradeDB => {
  if(!upgradeDB.objectStoreNames.contains('todo')) {
    upgradeDB.createObjectStore('todo', { unique: false } );
  }
});

export const indexDB = {
  save: value => dbOpen.then(dataBase => {
    const tx = dataBase.transaction('todo', 'readwrite');
    tx.objectStore('todo').put(value);
  }),
  remove: value => dbOpen.then(dataBase => {
    const tx = dataBase.transaction('todo', 'readwrite');
    tx.objectStore('todo').delete(value);
    return tx.complete;
  }),
  read: () => dbOpen.then(dataBase => {
    const tx = dataBase.transaction('todo').objectStore('todo').getAll();
  }),
  removeAll: () => dbOpen.then(dataBase => {
    const tx = db.transaction('todo', 'readwrite');
    tx.objectStore('todo').clear();
    return tx.complete;
  })
};
