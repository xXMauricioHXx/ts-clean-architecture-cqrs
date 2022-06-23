export namespace HttpClient {
  export type HttpConfig = {
    url?: string;
    method?: string;
    baseUrl?: string;
    headers?: {};
    params?: any;
    data?: any;
    timeout?: number;
  };

  export type HttpResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
  };
}

export interface HttpClient {
  get<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    config?: HttpClient.HttpConfig
  ): Promise<R>;
  post<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpClient.HttpConfig
  ): Promise<R>;
  delete<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    config?: HttpClient.HttpConfig
  ): Promise<R>;
  patch<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpClient.HttpConfig
  ): Promise<R>;
  put<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpClient.HttpConfig
  ): Promise<R>;
  head<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    config?: HttpClient.HttpConfig
  ): Promise<R>;
  createInstance(confg: HttpClient.HttpConfig): void;
}
