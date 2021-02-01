import {Persister} from './Persister';
import {isNil} from 'lodash-es';

export const create = (): Persister => {

  const count = async () => localStorage.length;

  const getItem = async (key, defaultValue) => {
    const storedStringValue = localStorage.getItem(key);
    if (isNil(storedStringValue)) {
      return defaultValue;
    }
    return JSON.parse(storedStringValue);
  };

  const setItem = async (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const deleteItem = async (key: string) => localStorage.removeItem(key);

  const clear = async () => localStorage.clear();

  return {
    count,
    getItem,
    setItem,
    deleteItem,
    clear,
  };
};

export const register = async () => {
  return {
    localStoragePersister: create(),
  };
};
