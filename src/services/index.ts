import moment from 'moment';
import { ITEM_PER_PAGE } from 'src/configs/constance';
import { PaginationType } from 'src/global';

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
