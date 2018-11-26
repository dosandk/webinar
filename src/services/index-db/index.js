import idb from 'idb';

const myDB = idb.open('myDb', 3, upgradeDb => {
  if (!upgradeDb.objectStoreNames.contains('todoStore')) {
    upgradeDb.createObjectStore('todoStore', { keyPath: 'keyValue', unique: false });
  }
});

export const remove = value => {
  return myDB.then(db => {
    const tx = db.transaction('todoStore', 'readwrite');
    tx.objectStore('todoStore').delete(value);
    return tx.complete;
  });
};

export const save = value => {
  myDB.then(db => {
    const tx = db.transaction('todoStore', 'readwrite');
    tx.objectStore('todoStore').put({ ['keyValue']: value });
    return tx.complete;
  });
};
export const read = () => {
  return myDB.then(db => {
    return db.transaction('todoStore')
      .objectStore('todoStore').getAll();
  }).then(item => {
    return item.map(el => el['keyValue']);
  });
};

export const removeAll = () => {
  return myDB.then(db => {
    const tx = db.transaction('todoStore', 'readwrite');
    tx.objectStore('todoStore').clear();
    return tx.complete;
  });
};
