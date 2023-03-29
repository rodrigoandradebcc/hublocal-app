interface LoadStorage {
  key: string;
}

interface SetStorage {
  key: string;
  value: any;
}

interface DestroyStorage {
  key: string;
}

export const loadStorage = <T>({ key }: LoadStorage): T | null => {
  const storeyedData = localStorage.getItem(key);
  return storeyedData ? JSON.parse(storeyedData) : null;
}

export const setStorage = ({ key, value }: SetStorage) => {
  const valueToString = JSON.stringify(value);

  localStorage.setItem(key, valueToString);
}

export const destroyStorage = ({ key }: DestroyStorage) => {
  localStorage.removeItem(key);
}

export const clearAllStorage = () => {
  localStorage.clear();
}


