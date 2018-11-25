export default class StorageAdapter {
  constructor (storageName, appName) {
    this.storage = window[storageName];
    this.appName = appName;
  }

  remove (value) {
    const currentCookie = this.readKey(this.appName);
    const cookie = currentCookie
      .split('&')
      .filter(item => item !== value)
      .join('&');

    this.writeKey(this.appName, cookie);
  }

  save (value) {
    const currentCookie = this.readKey(this.appName);
    const currentValue = currentCookie ? `${currentCookie}&` : '';

    this.writeKey(this.appName, `${currentValue}${value}`);
  }

  read () {
    const result = this.readKey(this.appName);

    return result ? Promise.resolve(result.split('&')) : Promise.resolve([]);
  }

  removeAll () {
    this.removeKey(this.appName);
  }

  writeKey (key, value) {
    return this.storage.setItem(key, value);
  }

  readKey (key) {
    return this.storage.getItem(key);
  }

  removeKey (key) {
    return this.storage.removeItem(key);
  }

  removeAllKey () {
    return this.storage.clear();
  }

}

