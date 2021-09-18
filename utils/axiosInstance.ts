import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import sandboxEnv from 'environment/sandboxEnv';

const HEADER_CONTENT_TYPE = 'application/json;charset=UTF-8';

export const getHeaders = (): { [key: string]: string } => ({
  'Content-Type': HEADER_CONTENT_TYPE,
});

const axiosInstance: AxiosInstance = axios.create({
  baseURL: sandboxEnv.urlBase,
  responseType: 'json',
});

/** ******************************************* */
// Interceptors
/** ******************************************* */
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const { headers } = config;

  Object.assign(headers, {
    ...getHeaders(),
  });

  return config;
});

export default axiosInstance;
