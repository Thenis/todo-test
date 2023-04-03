import { HttpClientMethods } from "../constants/http-client-methods";
import { Result } from "../services/http/result";

export type HttpClientResponseType =
  | "arraybuffer"
  | "blob"
  | "json"
  | "text"
  | undefined;

export type ResponseHeaders =
  | Record<string, string | number | boolean>
  | undefined;

export interface HttpClientOptions {
  headers?: ResponseHeaders;
  body?: any | undefined;
  params?: any;
  responseType?: HttpClientResponseType;
  withCredentials?: boolean;
}

export interface IHttpClient {
  request<TPayload, TResponse>(
    method: HttpClientMethods,
    url: string,
    options?: HttpClientOptions,
    data?: TPayload
  ): Promise<Result<TResponse, ResponseHeaders>>;

  requestByConfig(config: any): Promise<any>;
}
