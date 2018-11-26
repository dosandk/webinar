
import idb from 'idb';


const dbPromise = idb.open('todo', 1, upgradeDB => {
  upgradeDB.createObjectStore('store',{
    keyPath: 'keys',
    unique:false
  });
});
export const remove = value => {
  return dbPromise   
    .then(db => {
      const transaction = db.transaction('store', 'readwrite');
      transaction.objectStore('store').delete(value);
      return transaction.complete;
    })
    .catch(console.error('remove error'));
};

export const save = value => {
  return dbPromise
    .then(db => {
      const transaction = db.transaction('store', 'readwrite');
      transaction.objectStore('store').add({'keys': value});
      return transaction.complete;
    })
    .catch(console.error('save error'));
};

export const read = () => {
  return dbPromise
    .then(db => {
      const transaction = db.transaction('store', 'readonly');
      return transaction.objectStore('store').getAll();
    })
    .then(store => store.map(item => item['keys']))
    .catch(console.error('read error'));
};

export const removeAll = () => {
  return dbPromise
    .then(db => {
      const transaction = db.transaction('store', 'readwrite');
      transaction.objectStore('store').clear();
      return transaction.complete;
    })
    .catch(console.error('removeAll error'));
};