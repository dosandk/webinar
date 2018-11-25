import idb from 'idb';

const dbPromise = idb.open('todo-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('todo');
});

export const read = () => {
  return dbPromise.then(db => {
    return db.transaction('todo')
      .objectStore('todo').getAll();
  });
};

export const save = val => {
  return dbPromise.then(db => {
    const tx = db.transaction('todo', 'readwrite');
    tx.objectStore('todo').put(val, val);
    return tx.complete;
  });
};

export const remove = val => {
  return dbPromise.then(db => {
    const tx = db.transaction('todo', 'readwrite');
    tx.objectStore('todo').delete(val);
    return tx.complete;
  });
};

export const removeAll = () => {
  return dbPromise.then(db => {
    const tx = db.transaction('todo', 'readwrite');
    tx.objectStore('todo').clear();
    return tx.complete;
  });
};


