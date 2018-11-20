import idb from 'idb';

const openedDB = idb.open('todoDatabase', 1, upgradeDB => {
  if (!upgradeDB.objectStoreNames.contains('todos')) {
    upgradeDB.createObjectStore('todos', { unique: false });
  }
});

export const indexDBService = {
  save: value => openedDB.then(db => {
    const tx = db.transaction('todos', 'readwrite');

    tx.objectStore('todos').put(value, value);

    return tx.complete;
  }),
  read: () => openedDB.then(db => {
    return db.transaction('todos')
      .objectStore('todos').getAll();
  }),
  remove: value => openedDB.then(db => {
    const tx = db.transaction('todos', 'readwrite');

    tx.objectStore('todos').delete(value);

    return tx.complete;
  }),
  removeAll: () => openedDB.then(db => {
    const tx = db.transaction('todos', 'readwrite');

    tx.objectStore('todos').clear();

    return tx.complete;
  })
};
