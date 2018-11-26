let db;
let version = 1;
let request = indexedDB.open('todos', version);
const data = [];

request.onupgradeneeded = function(e) {
  db = e.target.result;
  db.createObjectStore('todo', { keyPath: 'text' });
};

export const remove = value => {
  let transaction = db.transaction(['todo'], 'readwrite');
  let store = transaction.objectStore('todo');
  store.delete(value);
};

export const save = value => {
  let transaction = db.transaction(['todo'], 'readwrite');
  let store = transaction.objectStore('todo');
  let request = store.put({ text: value });
};

export const read = () => {
  return new Promise(function (resolve) {
    request.onsuccess = function(e) {
    db = e.target.result;
    let transaction = db.transaction(['todo'], 'readwrite');
    let store = transaction.objectStore('todo');

      store.getAll().onsuccess = function(e) {
        let arr = e.target.result;
        for (let i = 0; i < arr.length; i++) {
          data.push(arr[i].text);
        }
        resolve(data);
      }
  };
  request.onerror = 'error';
});
};

export const removeAll = () => {
  let transaction = db.transaction(['todo'], 'readwrite');
  let store = transaction.objectStore('todo');
  store.clear();
};
