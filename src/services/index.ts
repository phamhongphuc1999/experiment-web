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
