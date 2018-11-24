import idb from 'idb';

const dbName = 'toDoList';
const storeName = 'todo';
const dbKeyPath = 'task';
const version = 1;

const dbPromise = idb.open(dbName, version, upgradeDb => {
  if (!upgradeDb.objectStoreNames.contains(storeName)) {
    upgradeDb.createObjectStore(storeName, { keyPath: dbKeyPath, unique: false });
  }
});

export const remove = value => {
  return dbPromise.then(db => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).delete(value);
    return tx.complete;
  });
};

export const save = value => {
  dbPromise.then(db => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put({ [dbKeyPath]: value });
    return tx.complete;
  });
};

export const read = () => {
  return dbPromise.then(db => {
    return db.transaction(storeName)
      .objectStore(storeName).getAll();
  }).then(item => {
    return item.map(el => el[dbKeyPath]);
  });
};

export const removeAll = () => {
  return dbPromise.then(db => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).clear();
    return tx.complete;
  });
};