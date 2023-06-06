const env = 'dev';

export interface IConfig {
  AXIOS_TIMEOUT: number;
  API: IApi;
}
export interface IApi {
  BASE_URL: string;
  API_FLIGHT: string;
}

const params: IConfig = {
  AXIOS_TIMEOUT: 12000,
  API: {
    BASE_URL: process.env.REACT_APP_BASE_URL || '',
    API_FLIGHT: process.env.REACT_APP_API_AUTHENTICATION || '',
  }
}
const prod = {
  ...params,
  apiUrl: '',
  environment: 'prod',
}

const dev = {
  ...params,
  apiUrl: '',
  environment: 'dev',
}
const config = {
  prod,
  dev
}
export const CONFIG = config[env]


