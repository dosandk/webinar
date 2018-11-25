import idb from 'idb';

export const indexDBService = {
  open (){
    return idb.open('todo', 1, upgradeDb =>{
      if (!upgradeDb.objectStoreNames.contains('list')) {
        upgradeDb.createObjectStore('list', {
          keyPath: 'task',
          unique: true
        });
      }
    });
  }
};
