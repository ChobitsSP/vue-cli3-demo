import axios, { AxiosRequestConfig } from "axios";

export default class AxiosUtils {
  static async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<TopResult<T>> {
    const rsp: any = await axios.get(url, config);
    return rsp as TopResult<T>;
  }
  static async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<TopResult<T>> {
    const rsp: any = await axios.post(url, data, config);
    return rsp as TopResult<T>;
  }
}

interface TopResult<T = any> {
  code: number;
  msg?: string;
  result?: T;
}
