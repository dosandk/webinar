const API_KEY = 'p2TP7XLURQhMSf4Nv3BGCIIMwk5D5s3h';
const url = `https://api.mlab.com/api/1/databases/todo-app/collections/tasks/?apiKey=${API_KEY}`;
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
};

export const mLabService = {
  read () {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.error('data', data);
        return data.map(item => item.value);
      });
  },
  save (value) {
    const options = {
      method: 'POST',
      body: JSON.stringify([{
        value
      }])
    };

    return fetch(url, {...defaultOptions, ...options})
      .then(response => response.json())
      .then(data => {
        console.error('data', data);
        return data;
      });
  },
  remove (value) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.filter(item => item.value !== value);
      })
      .then(data => {
        const options = {
          method: 'PUT',
          body: JSON.stringify(data)
        };

        return fetch(url, {...defaultOptions, ...options})
          .then(response => response.json())
          .then(data => {
            console.error('data', data);
            return data;
          });
      });
  },
  removeAll () {
    const options = {
      method: 'PUT',
      body: JSON.stringify([])
    };

    return fetch(url, {...defaultOptions, ...options})
      .then(response => response.json())
      .then(data => {
        console.error('data', data);
        return data;
      });
  }
};
