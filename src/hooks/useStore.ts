import { useCallback, useState } from 'react';

type ReturnParams<T> = [store: T, set: (store: T) => void];

export const useStore = <T extends unknown>(
  key: string,
  defaultParam?: T
): ReturnParams<T> => {
  const initialState =
    JSON.parse(localStorage.getItem(key) as string) ?? defaultParam;
  const [store, setStore] = useState<T>(initialState);

  const set = useCallback((next) => {
    localStorage.setItem(key, JSON.stringify(next));
    setStore(next);
  }, []);

  return [store, set];
};
