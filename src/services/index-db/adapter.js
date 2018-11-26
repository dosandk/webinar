import idb from 'idb';

const dbName = 'tasks';
const dbVersion = 1;
const key = 'task';
const dbPromise = idb.open(dbName, dbVersion, upgradeDB => {
  upgradeDB.createObjectStore(dbName);
});


export const save = value => {
  return dbPromise.then(db => {
    const tx = db.transaction(dbName, 'readwrite');
    tx.objectStore(dbName).put(value, key);
    return tx.complete;
  });
};
export const read = () => {
  return dbPromise.then(db => {
    return db.transaction(dbName)
      .objectStore(dbName).getAll();
  });
};
export const remove = value => {
  return dbPromise.then(db => {
    const tx = db.transaction(dbName, 'readwrite');
    tx.objectStore(dbName).delete(value);
    return tx.complete;
  });
};
export const removeAll = () => {
  return dbPromise.then(db => {
    const tx = db.transaction(dbName, 'readwrite');
    tx.objectStore(dbName).clear();
    return tx.complete;
  });
};

