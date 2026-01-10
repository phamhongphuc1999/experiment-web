import moment from 'moment';
import { toast } from 'sonner';
import { APP_NAME } from 'src/configs/constance';
import { PositionType } from 'src/global';
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

/**
 * Converts a hexadecimal string to a Uint8Array.
 * @param hex - The hexadecimal string to convert (must have even length)
 * @returns A Uint8Array containing the converted bytes
 * @throws Error if the hex string has odd length
 */
export function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Gets the current Unix timestamp in seconds.
 * @returns The current timestamp in seconds since Unix epoch
 */
export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Formats a PostgreSQL timestamp to a human-readable local time string.
 * @param time - The UTC timestamp string from PostgreSQL
 * @returns Formatted date string in 'MMM DD, YYYY HH:mm' format
 */
export function postgrestMoment(time: string): string {
  return moment.utc(time).local().format('MMM DD, YYYY HH:mm');
}

/**
 * Creates a randomly shuffled array of numbers from 0 to range-1 using Fisher-Yates shuffle.
 * @param range - The size of the array to generate
 * @returns A shuffled array of numbers [0, 1, 2, ..., range-1]
 */
export function randomSubGroup(range: number): number[] {
  const _array = Array.from(Array(range).keys(), (key) => key);
  for (let i = range - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }
  return _array;
}

/**
 * Truncates a string to show only the beginning and end with ellipsis in the middle.
 * @param s - The string to format
 * @param frac - Number of characters to show at start and end (default: 3)
 * @returns The formatted string or original if short enough
 */
export function formatText(s: string, frac = 3): string {
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

/**
 * Checks if two positions are equal.
 * @param position1 - First position [row, column]
 * @param position2 - Second position [row, column]
 * @returns True if both positions have the same coordinates
 */
export function isPositionEqual(position1: PositionType, position2: PositionType): boolean {
  return position1[0] === position2[0] && position1[1] === position2[1];
}

/**
 * Checks if a position exists in an array of positions.
 * @param position - The position to search for
 * @param positions - Array of positions to search in
 * @returns True if the position is found in the array
 */
export function isPositionIncludes(
  position: PositionType,
  positions: Array<PositionType>
): boolean {
  return positions.some((p) => p[0] === position[0] && p[1] === position[1]);
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param milliseconds - The number of milliseconds to wait
 */
export async function sleep(milliseconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Creates a new array with the element at the specified index removed.
 * @param arr - The source array
 * @param index - The index of the element to remove
 * @returns A new array without the element at the specified index
 */
export function removeAtIndex<T>(arr: T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

/**
 * Generates a random integer from 0 to len-1.
 * @param len - The upper bound (exclusive)
 * @returns A random integer in the range [0, len)
 */
export function getRandom(len: number): number {
  return Math.floor(Math.random() * len);
}
