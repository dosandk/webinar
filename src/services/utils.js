export const removeAll = adapters => {
  for (const key in adapters) {
    if (adapters.hasOwnProperty(key)) {
      adapters[key].removeAll();
    }
  }
};

export const save = (adapters, value) => {
  for (const key in adapters) {
    if (adapters.hasOwnProperty(key)) {
      adapters[key].save(value);
    }
  }
};

export const remove = (adapters, value) => {
  for (const key in adapters) {
    if (adapters.hasOwnProperty(key)) {
      adapters[key].remove(value);
    }
  }
};
