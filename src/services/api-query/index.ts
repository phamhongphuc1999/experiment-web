import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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

  async get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return await axios
      .get(`${this.root}${url}`, { ...config, ...this.config })
      .then<T>(responseBody);
  }

  async post<T = unknown, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) {
    return await axios
      .post(`${this.root}${url}`, data, { ...config, ...this.config })
      .then<T>(responseBody);
  }

  async put<T = unknown, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) {
    return await axios
      .put(`${this.root}${url}`, data, { ...config, ...this.config })
      .then<T>(responseBody);
  }

  async del<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return await axios
      .delete(`${this.root}${url}`, { ...config, ...this.config })
      .then<T>(responseBody);
  }
}

export function serializeParams(params: Record<string, unknown>) {
  const { filter, sort, ...other } = params;
  const searchParams = new URLSearchParams();

  Object.entries(other).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  if (typeof filter === 'object' && filter !== null) {
    Object.entries(filter).forEach(([key, value]) => {
      searchParams.append(`filter[${key}]`, String(value));
    });
  }

  if (typeof sort === 'object' && sort !== null) {
    Object.entries(sort).forEach(([key, value]) => {
      searchParams.append(`sort[${key}]`, String(value));
    });
  }

  return searchParams.toString();
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
  const id = crypto.randomUUID();
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiredTimestamp = currentTimestamp;
  const _key = `${expiredTimestamp}_${id}`;
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
  const [timestamp, id] = clientId.toString().split('_');
  const decryptedData = wasm.decrypt(timestamp, id, iv, rawData.data);
  return JSON.parse(decryptedData);
});

export { baseQuery };
