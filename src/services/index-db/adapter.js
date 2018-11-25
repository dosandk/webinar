import {indexDBService} from './index';

export const remove = value => {
  return indexDBService.open()
    .then(db => {
      const transaction = db.transaction('list', 'readwrite');
      transaction.objectStore('list').delete(value);
      return transaction.complete;
    });
};

export const save = value => {
  return indexDBService.open()
    .then(db => {
      const transaction = db.transaction('list', 'readwrite');
      transaction.objectStore('list').add({'task': value});
      return transaction.complete;
    });
};

export const read = () => {
  return indexDBService.open()
    .then(db => {
      const transaction = db.transaction('list', 'readonly');
      return transaction.objectStore('list').getAll();
    })
    .then(store => store.map(item => item['task']));
};

export const removeAll = () => {
  return indexDBService.open()
    .then(db => {
      const transaction = db.transaction('list', 'readwrite');
      transaction.objectStore('list').clear();
      return transaction.complete;
    });
};
