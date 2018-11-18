const version = 1;
let db = null;
let lastIndex = 0;

function open () {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('todos', version);

    request.onupgradeneeded = e => {
      db = e.target.result;

      e.target.transaction.onerror = indexedDB.onerror;

      if (db.objectStoreNames.contains('todo')) {
        db.deleteObjectStore('todo');
      }

      db.createObjectStore('todo', { keyPath: 'id' });
    };

    request.onsuccess = e => {
      db = e.target.result;
      resolve();
    };

    request.onerror = () => {
      reject('Could not open database');
    };
  });
}

function save (todoText) {
  const transaction = db.transaction(['todo'], 'readwrite');
  const store = transaction.objectStore('todo');
  
  lastIndex++;

  return new Promise((resolve, reject) => {
    const data = {
      id: lastIndex,
      text: todoText
    };

    const request = store.put(data);

    request.onsuccess = () => {
      resolve(data.id);
    };

    request.onerror = () => {
      reject('Could not add the passed item');
    };
  });
}

function read () {
  const transaction = db.transaction(['todo'], 'readwrite');
  const store = transaction.objectStore('todo');
  const todos = [];

  return new Promise((resolve, reject) => {
    const keyRange = IDBKeyRange.lowerBound(0);
    const cursorRequest = store.openCursor(keyRange);

    cursorRequest.onsuccess = e => {
      const result = e.target.result;

      if (result) {
        todos.push(result.value);

        if (result.value.id > lastIndex) {
          lastIndex = result.value.id;
        }

        result.continue();
      } else {
        resolve(todos);
      }
    };

    cursorRequest.onerror = () => {
      reject('Could not fetch items from the database');
    };
  });
}

function remove (id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todo'], 'readwrite');
    const store = transaction.objectStore('todo');
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject('Could not delete the item');
    };
  });
}

function removeAll () {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todo'], 'readwrite');
    const store = transaction.objectStore('todo');
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject('Could not delete items');
    };
  });
}

export const indexedDBService = { 
  open, 
  save, 
  read, 
  remove, 
  removeAll 
};