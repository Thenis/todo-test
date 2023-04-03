import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { inject, singleton } from "tsyringe";
import type {
  IHttpClient,
  HttpClientOptions,
  ResponseHeaders,
} from "src/infrastructure/interfaces/http-client.interface";
import { HttpClientMethods } from "src/infrastructure/constants/http-client-methods";
import { IHttpService } from "src/infrastructure/interfaces/http-service.interface";
import { Result } from "./result";

@singleton()
export class HttpService implements IHttpService {
  constructor(
    @inject(SERVICE_KEYS.HTTP_CLIENT) private httpClient: IHttpClient
  ) {}

  async get<TResponse>(
    url: string,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>> {
    return this.httpClient.request<unknown, TResponse>(
      HttpClientMethods.GET,
      url,
      config
    );
  }

  async delete<TResponse>(
    url: string,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>> {
    return this.httpClient.request<unknown, TResponse>(
      HttpClientMethods.DELETE,
      url,
      config
    );
  }

  async post<TPayload, TResponse>(
    url: string,
    data?: TPayload,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>> {
    return this.httpClient.request(HttpClientMethods.POST, url, config, data);
  }

  async put<TPayload, TResponse>(
    url: string,
    data?: TPayload,
    config?: HttpClientOptions | undefined
  ): Promise<Result<TResponse, ResponseHeaders>> {
    return this.httpClient.request(HttpClientMethods.PUT, url, config, data);
  }

  async requestByConfig(config: any) {
    return await this.httpClient.requestByConfig(config);
  }
}
