import idb from 'idb';

const dbPromise = idb.open('toDoListDB', 1, upgradeDb => {
  if (!upgradeDb.objectStoreNames.contains('todo')) {
    upgradeDb.createObjectStore('todo', {keyPath: 'value', unique: false});
  }
});

export const remove = value => {
  dbPromise.then(function (db) {
    const tx = db.transaction('todo', 'readwrite');
    const store = tx.objectStore('todo');
    store.delete(value);
    return tx.complete;
  }).then(function () {
    // eslint-disable-next-line no-console
    console.log('Item deleted');
  });

};

export const save = value => {
  dbPromise.then(function (db) {
    const tx = db.transaction('todo', 'readwrite');
    const store = tx.objectStore('todo');
    store.add({value});
    return tx.complete;
  }).then(function (val) {
    // eslint-disable-next-line no-console
    console.log('added item to the store os!', val);
  });

};

export const read = () => {
  return dbPromise.then(function (db) {
    const tx = db.transaction('todo', 'readonly');
    const store = tx.objectStore('todo');
    return store.getAll();
  }).then(function (val) {
    return val.map(i => i.value);
  });
};

export const removeAll = () => {
  dbPromise.then(function (db) {
    const tx = db.transaction('todo', 'readwrite');
    const store = tx.objectStore('todo');
    return store.getAll().then(items => {
      items.forEach(item => store.delete(item.value));
    });
  }).then(function () {
    // eslint-disable-next-line no-console
    console.log('all items deleted!');
  });
};
