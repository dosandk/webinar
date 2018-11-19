const params = {
  db: null,
  dbName: 'todos',
  list: [],
  store: 'todo',
  version: 1
};

export const indexDbService = {
  addToList (key, value) {
    params.list.push({
      key: key,
      value: value
    });
  },
  getStore () {
    const store = params.store;

    return params.db.transaction([store], 'readwrite').objectStore(store);
  },
  open () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(params.dbName, params.version);

      request.onerror = () => reject('Database not opened.');
      request.onsuccess = () => resolve(params.db = request.result);
      request.onupgradeneeded = e => {
        e.currentTarget.result.createObjectStore(params.store, {
          autoIncrement: true
        });
      };
    });
  },
  read () {
    return this.open().then(() => {
      return new Promise((resolve, reject) => {
        const cursor = this.getStore().openCursor();
        params.list = [];

        cursor.onerror = () => reject('Data not founded.');
        cursor.onsuccess = e => {
          const result = e.target.result;

          if (result) {
            this.addToList(result.key, result.value);
            result.continue();
          } else {
            const list = params.list.map(item => item.value);

            resolve(list);
          }
        };
      });
    });
  },
  save (value) {
    return new Promise((resolve, reject) => {
      const save = this.getStore().add(value);

      save.onerror = () => reject('Data not added.');
      save.onsuccess = res => {
        this.addToList(res.target.result, value);
        resolve();
      };
    });
  },
  remove (value) {
    return new Promise((resolve, reject) => {
      const find = params.list.find(item => item.value === value);
      const remove = this.getStore().delete(find.key);

      remove.onerror = () => reject('Data not removed.');
      remove.onsuccess = () => resolve();
    });
  },
  removeAll () {
    return new Promise((resolve, reject) => {
      const clear = this.getStore().clear();

      clear.onerror = () => reject('Data not cleared.');
      clear.onsuccess = () => resolve();
    });
  }
};
