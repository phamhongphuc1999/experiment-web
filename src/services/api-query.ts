/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { IV_HEX } from 'src/configs/constance';
import { hexToUint8Array } from '.';
import { initWasm } from './wasm';

export function serializeParams(params: Record<string, any>) {
  const { filter, sort, ...other } = params;
  const queryStr = queryString.stringify(other, { arrayFormat: 'none', skipNull: true });
  const strings = [];
  if (queryStr) strings.push(queryStr);

  if (typeof filter === 'object') {
    const filterStr = Object.entries(filter)
      .map(([key, value]) => `filter%5B${key}%5D=${value}`)
      .join('&');
    if (filterStr) {
      strings.push(filterStr);
    }
  }

  if (typeof sort === 'object') {
    const sortStr = Object.entries(sort)
      .map(([key, value]) => `sort%5B${key}%5D=${value}`)
      .join('&');
    if (sortStr) {
      strings.push(sortStr);
    }
  }

  return strings.join('&');
}

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const baseQuery: AxiosInstance = axios.create({
  baseURL: '/api',
  cancelToken: source.token,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  paramsSerializer: {
    serialize: serializeParams,
  },
});

baseQuery.interceptors.response.use(async (response: AxiosResponse) => {
  const headers = response.headers as AxiosHeaders;
  const clientId = headers.get('x-client-id');
  const rawData = response.data;
  if (!clientId) return rawData;
  const wasm = await initWasm();
  const iv = hexToUint8Array(IV_HEX);
  const decryptedData = wasm.decrypt(clientId.toString(), iv, rawData.data);
  return JSON.parse(decryptedData);
});

export { baseQuery };
