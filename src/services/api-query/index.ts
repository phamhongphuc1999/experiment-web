/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { ENCRYPT_KEY, IV_HEX } from 'src/configs/constance';
import * as uuid from 'uuid';
import { hexToUint8Array } from '..';
import { initWasm } from '../wasm';

export const defaultHeader = { Accept: 'application/json', 'Content-Type': 'application/json' };

function responseBody<T>(res: AxiosResponse<T>) {
  return res.data;
}

export default class ApiQuery {
  root: string;
  config: AxiosRequestConfig;

  constructor(rootUrl: string, config?: AxiosRequestConfig) {
    this.root = rootUrl;
    if (config) {
      this.config = config;
      if (!this.config?.headers) this.config.headers = {};
      this.config['headers'] = { ...this.config['headers'], ...defaultHeader };
    } else this.config = { headers: defaultHeader };
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return await axios
      .get(`${this.root}${url}`, { ...config, ...this.config })
      .then<T>(responseBody);
  }

  async post<T = any, B = any>(url: string, data?: B, config?: AxiosRequestConfig) {
    return await axios
      .post(`${this.root}${url}`, data, { ...config, ...this.config })
      .then<T>(responseBody);
  }

  async put<T = any, B = any>(url: string, data?: B, config?: AxiosRequestConfig) {
    return await axios
      .put(`${this.root}${url}`, data, { ...config, ...this.config })
      .then<T>(responseBody);
  }

  async del<T = any>(url: string, config?: AxiosRequestConfig) {
    return await axios
      .delete(`${this.root}${url}`, { ...config, ...this.config })
      .then<T>(responseBody);
  }
}

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

baseQuery.interceptors.request.use(async (config) => {
  const wasm = await initWasm();
  const id = uuid.v4();
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiredTimestamp = currentTimestamp;
  const iv = hexToUint8Array(IV_HEX);
  const _key = wasm.create_key(ENCRYPT_KEY, iv, expiredTimestamp.toString(), id);
  config.headers['x-client-id'] = _key;
  return config;
});

baseQuery.interceptors.response.use(async (response: AxiosResponse) => {
  const headers = response.headers as AxiosHeaders;
  const clientId = headers.get('x-client-id');
  const rawData = response.data;
  if (!clientId) return rawData;
  const wasm = await initWasm();
  const iv = hexToUint8Array(rawData.iv);
  const decryptedData = wasm.decrypt(clientId.toString(), iv, rawData.data);
  return JSON.parse(decryptedData);
});

const weatherApi = new ApiQuery('https://api.open-meteo.com/v1/forecast');

export { baseQuery, weatherApi };
