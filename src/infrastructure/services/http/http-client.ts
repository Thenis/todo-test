import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestTransformer,
} from "axios";
import { format } from "date-fns";
import qs from "qs";
import { HttpClientMethods } from "src/infrastructure/constants/http-client-methods";
import {
  IHttpClient,
  HttpClientOptions,
  ResponseHeaders,
} from "src/infrastructure/interfaces/http-client.interface";
import { singleton } from "tsyringe";
import { HTTP_CLIENT_INSTANCE } from "./http-client-instance";
import { Result } from "./result";

const dateTransformer: AxiosRequestTransformer = (data) => {
  if (data instanceof Date) {
    // do your specific formatting here
    return format(data, `yyyy-MM-dd'T'HH:mm:ss'Z'`);
  }

  if (Array.isArray(data)) {
    return data.map((val) => dateTransformer(val));
  }

  if (
    typeof data === "object" &&
    !(data instanceof FormData) &&
    data !== null
  ) {
    return Object.fromEntries(
      Object.entries(data).map(([key, val]) => [key, dateTransformer(val)])
    );
  }

  return data;
};

@singleton()
export class AxiosHttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance = HTTP_CLIENT_INSTANCE;

  async request<TPayload, TResponse>(
    method: HttpClientMethods,
    url: string,
    options: HttpClientOptions,
    data?: TPayload
  ): Promise<Result<TResponse, ResponseHeaders>> {
    switch (method) {
      case HttpClientMethods.GET:
        const getResponse = await this.get(url, {
          headers: options?.headers,
          params: options?.params,
          responseType: options?.responseType,
          withCredentials: options?.withCredentials,
        });
        return Result.ok(getResponse.data, getResponse.headers);

      case HttpClientMethods.POST:
        const postResponse = await this.post(url, data, {
          headers: options?.headers,
          params: options?.params,
          responseType: options?.responseType,
          withCredentials: options?.withCredentials,
        });
        return Result.ok(postResponse.data, postResponse.headers);

      case HttpClientMethods.PUT:
        const putResponse = await this.put(url, data, {
          headers: options?.headers,
          params: options?.params,
          responseType: options?.responseType,
          withCredentials: options?.withCredentials,
        });
        return Result.ok(putResponse.data, putResponse.headers);

      case HttpClientMethods.DELETE:
        const deleteResponse = await this.delete(url, {
          headers: options?.headers,
          params: options?.params,
          responseType: options?.responseType,
          withCredentials: options?.withCredentials,
        });
        return Result.ok(deleteResponse.data, deleteResponse.headers);

      default:
        throw new Error("HTTP method not implemented");
    }
  }

  async requestByConfig(config: any): Promise<any> {
    return axios(config);
  }

  private async get(url: string, config: AxiosRequestConfig) {
    return await this.axiosInstance.get(url, {
      ...config,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
  }

  private async post(url: string, data: any, config: AxiosRequestConfig) {
    return await this.axiosInstance.post(url, data, {
      ...config,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
      transformRequest: [dateTransformer].concat(
        this.axiosInstance.defaults.transformRequest as any
      ),
    });
  }

  private async delete(url: string, config: AxiosRequestConfig) {
    return await this.axiosInstance.delete(url, {
      ...config,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
  }

  private async put(url: string, data: any, config: AxiosRequestConfig) {
    return await this.axiosInstance.put(url, data, {
      ...config,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
      transformRequest: [dateTransformer].concat(
        this.axiosInstance.defaults.transformRequest as any
      ),
    });
  }
}
