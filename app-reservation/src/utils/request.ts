import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { CONFIG } from "./config";

const axiosInstance = axios.create();

interface IAxiosErrorDataData {
  code?: string;
  message?: string;
  data?: IAxioaValidation;
}
export interface IAxiosErrorData {
  data?: IAxiosErrorDataData;
}

interface IAxioaValidation {
  validationDetails?: string[];
}

export interface IAxiosRequestError {
  response?: IAxiosErrorData;
}

export const request = async (
  method: AxiosRequestConfig["method"],
  url: string,
  data?: any,
  secured?: boolean
): Promise<AxiosResponse<any, IAxiosRequestError>> => {
  try {
    let headers: AxiosRequestConfig["headers"] = {
      "Content-Type": "application/json",
    };

    const options: AxiosRequestConfig = {
      method,
      data,
      url,
      headers,
      baseURL: CONFIG.API.BASE_URL,
    };
    console.log("axios options", options);
    const response = await axiosInstance.request(options);
    return response.data;
  } catch (error) {
    console.warn(`axios request error ${error} url: ${url} method: ${method}`);
    throw error;
  }
};
