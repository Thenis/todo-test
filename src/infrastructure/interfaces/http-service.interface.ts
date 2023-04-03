import { Result } from "../services/http/result";
import { HttpClientOptions, ResponseHeaders } from "./http-client.interface";

export interface IHttpService {
  get<TResponse = unknown>(
    url: string,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>>;

  delete<TResponse = unknown>(
    url: string,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>>;

  post<TPayload = unknown, TResponse = unknown>(
    url: string,
    data?: TPayload,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>>;

  put<TPayload = unknown, TResponse = unknown>(
    url: string,
    data?: TPayload,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>>;

  requestByConfig(config: any): Promise<any>;
}
