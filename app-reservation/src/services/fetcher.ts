import { request } from "utils/request";
import { AxiosRequestConfig } from "axios";

export const fetcher =
  ({
    data,
    errorMessage,
    method,
    isSecured,
  }: {
    data?: any;
    errorMessage?: string;
    method: AxiosRequestConfig["method"];
    isSecured?: boolean;
  }) =>
  (url: string): Promise<any> => {
    return request(method, url, data, isSecured)
      .then((res) => {
        return res.data;
      })
      .catch(networkErrors(errorMessage));
  };

const networkErrors = (message?: string) => (err: any) => {
  if (err?.response?.status === 401) {
    const msg = message ?? "User not authorized";

    console.warn(msg);
  }

  console.warn(err?.response?.data?.message);
};
