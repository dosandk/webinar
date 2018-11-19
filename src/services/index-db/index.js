const baseName = 'todo';
const storeName = 'tasksList';
const version = 1;

const onError = reject => error => {
  // eslint-disable-next-line no-console
  console.log('Error: ', error);
  return reject(error);
};

class IndexDbService {
  init () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(baseName, version);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = onError(reject);

      request.onupgradeneeded = e => {
        e.currentTarget.result.createObjectStore(storeName, { autoIncrement: true });
      };
    });
  }

  getStore () {
    return this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName);
  }

  async read () {
    await this.init();

    return new Promise((resolve, reject) => {
      const items = [];
      const cursor = this.getStore().openCursor();

      cursor.onerror = onError(reject);

      cursor.onsuccess = ({ target }) => {
        const { result } = target;

        if (result) {
          const { key: id, value } = result;

          items.push({ id, value });
          result.continue();
        } else {
          return resolve(items);
        }
      };
    });
  }

  save (value) {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const request = store.add(value);

      request.onsuccess = event =>
        resolve({ id: event.target.result, value });
      request.onerror = onError(reject);
    });
  }

  remove (value, id) {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const request = store.delete(parseInt(id));

      request.onerror = onError(reject);
      request.onsuccess = e => resolve(e);
    });
  }

  removeAll () {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      const request = store.clear();

      request.onerror = onError(reject);
      request.onsuccess = e => resolve(e);
    });
  }
}

const indexDbService = new IndexDbService();

export default indexDbService;