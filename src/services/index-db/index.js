export const indexDbService = {
  write (key, value) {
    openDataBase(key)
      .then(response => {
        const dataBase = response;
        const transaction = response.transaction(key, 'readwrite');
        const table = transaction.objectStore(key);
        table.put(value);
        transaction.oncomplete = () => {
          dataBase.close();
        };
      })
      .catch(error => console.log(error)); /* eslint-disable-line no-console */
  },
  read (key) {
    return new Promise(resolve => {
      openDataBase(key)
        .then(response => {
          const dataBase = response;
          const transaction = response.transaction(key, 'readonly');
          const table = transaction.objectStore(key);
          const data = table.getAll();

          transaction.oncomplete = () => {
            const {result} = data;
            dataBase.close();

            resolve(result);
          };
        })
        .catch(error => console.log(error)); /* eslint-disable-line no-console */
    });
  },
  remove (key, value) {
    let index;

    this.read(key)
      .then(response => {
        index = response.indexOf(value);

        return openDataBase(key);
      })
      .then(response => {
        const dataBase = response;
        let transaction = dataBase.transaction(key, 'readonly');
        let table = transaction.objectStore(key);
        let tableKeys = table.getAllKeys();

        transaction.oncomplete = () => {
          tableKeys = tableKeys.result;
          transaction = dataBase.transaction(key, 'readwrite');
          table = transaction.objectStore(key);
          table.delete(tableKeys[index]);
          dataBase.close();
        };
      })
      .catch(error => console.log(error)); /* eslint-disable-line no-console */
  },
  removeAll (key) {
    openDataBase(key)
      .then(response => {
        const dataBase = response;
        const transaction = dataBase.transaction(key, 'readwrite');
        const table = transaction.objectStore(key);

        table.clear();
        transaction.oncomplete = () => {
          dataBase.close();
        };
      })
      .catch(error => new Error(error));
  }
};

function openDataBase (key) {
  return new Promise(resolve => {
    const request = indexedDB.open('main', 1);

    request.onupgradeneeded = function () {
      const dataBase = this.result;

      if (!dataBase.objectStoreNames.contains(key)) {
        dataBase.createObjectStore(key, {autoIncrement: true});
      }
    };

    request.onsuccess = function () {
      const dataBase = this.result;

      return resolve(dataBase);
    };

    request.onerror = function () {
      throw new Error('Something went wrong');
    };
  });
}
