import moment from 'moment';
import { toast } from 'sonner';
import { APP_NAME, ITEM_PER_PAGE } from 'src/configs/constance';
import { PaginationType } from 'src/global';
import { ZodError } from 'zod';

type SBase = {
  toString: () => string;
};

export class LocalStorage {
  static set<T extends SBase>(key: string, value: T, formatter?: (value: T) => string) {
    if (formatter) localStorage.setItem(key, formatter(value));
    else localStorage.setItem(key, value.toString());
  }

  static get<T>(key: string): T | null {
    return localStorage.getItem(key) as T | null;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static expireSet<T extends SBase>(
    key: string,
    value: T,
    interval: number,
    formatter?: (value: T) => string
  ) {
    const currentTimestamp = Date.now();
    const expiredTimestamp = interval + currentTimestamp;
    const data = {
      value: formatter ? formatter(value) : value.toString(),
      timestamp: expiredTimestamp,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  static expireGet(key: string): { data: string | null; error?: string } {
    const rawData = localStorage.getItem(key);
    if (rawData) {
      const data: { value: string; timestamp: string } = JSON.parse(rawData);
      const currentTimestamp = Date.now();
      if (Number(data.timestamp) < currentTimestamp) return { data: null, error: 'key is expired' };
      return { data: data.value };
    } else return { data: null, error: 'Invalid key' };
  }
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
  return moment.utc(time).local().format('MMM DD, YYYY HH:mm');
}

export function randomSubGroup(range: number) {
  const _array = Array.from(Array(range).keys(), (key) => key);
  for (let i = range - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }
  return _array;
}

export function getPaginationRange(pagination?: PaginationType) {
  const page = pagination?.page == undefined ? 0 : pagination.page;
  const pageSize = pagination?.pageSize == undefined ? ITEM_PER_PAGE : pagination.pageSize;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  return { from, to };
}

export function formatText(s: string, frac = 3) {
  return s.length > frac * 2 + 5 ? `${s.substring(0, frac)}...${s.slice(-frac)}` : s;
}

export function generateAppMetadata(title: string) {
  return { title: `${APP_NAME} | ${title}`, openGraph: { title: `${APP_NAME} | ${title}` } };
}

export function zodError<T>(error?: ZodError<T>) {
  if (error && error.issues.length > 0) {
    const issue = error.issues[0];
    toast.error(`${String(issue.path[0])}: ${issue.message}`);
  }
}
