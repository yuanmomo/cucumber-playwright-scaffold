import { BaseWorld, BaseWorldOptions } from '@org/common-test-cucumber-playwright';
import axios, { AxiosResponse } from 'axios';

export class CustomWorld extends BaseWorld {
  apiResponse?: AxiosResponse;
  
  constructor(options: BaseWorldOptions) {
    super(options);
  }

  async sendHttpRequest(url: string, method: string = 'GET', data?: any): Promise<void> {
    this.apiResponse = await axios({
      url,
      method,
      data,
      validateStatus: () => true, // 接受所有状态码
    });
  }

  getResponseData(): any {
    return this.apiResponse?.data;
  }

  getResponseStatus(): number {
    return this.apiResponse?.status || 0;
  }
}