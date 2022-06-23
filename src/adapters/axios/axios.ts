import axios, { AxiosRequestConfig, AxiosInstance, Method } from 'axios';
import { injectable } from 'tsyringe';
import { HttpClient } from '@/infra/integrations/http/ports';

@injectable()
export class AxiosClient implements HttpClient {
  private instance: AxiosInstance;

  get<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    config?: HttpClient.HttpConfig
  ): Promise<R> {
    return this.instance.get(url, this.loadConfigs(config));
  }

  post<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpClient.HttpConfig
  ): Promise<R> {
    return this.instance.post(url, data, this.loadConfigs(config));
  }

  delete<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    config?: HttpClient.HttpConfig
  ): Promise<R> {
    return this.instance.delete(url, this.loadConfigs(config));
  }

  patch<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpClient.HttpConfig
  ): Promise<R> {
    return this.instance.patch(url, data, this.loadConfigs(config));
  }

  put<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpClient.HttpConfig
  ): Promise<R> {
    return this.instance.put(url, data, this.loadConfigs(config));
  }

  head<T = any, R = HttpClient.HttpResponse<T>>(
    url: string,
    config?: HttpClient.HttpConfig
  ): Promise<R> {
    return this.instance.head(url, this.loadConfigs(config));
  }

  createInstance(config: HttpClient.HttpConfig): void {
    this.instance = axios.create({
      ...this.loadConfigs(config),
    });
  }

  protected loadConfigs(config?: HttpClient.HttpConfig): AxiosRequestConfig {
    if (!config) {
      return {};
    }
    const { baseUrl, data, headers, method, params, timeout, url } = config;
    const castedMethod = method as Method;

    return {
      url,
      method: castedMethod,
      baseURL: baseUrl,
      headers,
      params,
      data,
      timeout,
    };
  }
}
