import moment from 'moment';
import { LS } from 'src/configs/constance';

type SBase = {
  toString: () => string;
};

export class LocalStorage {
  static set<T extends SBase>(key: string, value: T, formatter?: (value: T) => string) {
    if (formatter) localStorage.setItem(key, formatter(value));
    else localStorage.setItem(key, value.toString());
  }

  static get(key: string): string | null {
    return localStorage.getItem(key);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}

export function switchTheme() {
  const newTheme = LocalStorage.get(LS.THEME) == 'dark' ? 'light' : 'dark';
  LocalStorage.set(LS.THEME, newTheme);
  document.body.dataset.theme = newTheme;
  if (newTheme == 'dark') document.documentElement.classList.toggle('dark');
  else document.documentElement.classList.remove('dark');
}

export function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function postgrestMoment(time: string) {
  return moment(time, 'HH:mm:ss.SSSSSS');
}
