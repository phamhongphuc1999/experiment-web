import moment from 'moment';

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
  return moment.utc(time, 'HH:mm:ss.SSSSSS').local().format('MMM DD, YYYY HH:mm');
}

export function randomSubGroup(range: number) {
  const _array = Array.from(Array(range).keys(), (key) => key + 1);
  for (let i = range - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }
  return _array;
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
