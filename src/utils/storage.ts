import {MMKV} from 'react-native-mmkv';


// Initialize storage instance
const storage = new MMKV();

export const Storage = {
  set: (key: string, value: string | number | boolean): void => {
    storage.set(key, value);
  },

  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  delete: (key: string): void => {
    storage.delete(key);
  },

  clearAll: (): void => {
    storage.clearAll();
  },
};

export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  ONBOARDING_DONE: 'onboarding_done',
} as const;
