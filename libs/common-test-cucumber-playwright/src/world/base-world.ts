import { World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import * as playwright from 'playwright';

export interface BaseWorldOptions extends IWorldOptions {
  parameters: any;
}

export class BaseWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  
  // 用于存储测试数据的内存存储
  protected dataStore: Map<string, any>;

  constructor(options: BaseWorldOptions) {
    super(options);
    this.dataStore = new Map();
  }

  async init(): Promise<void> {
    this.browser = await playwright.chromium.launch({
      headless: true,
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async cleanup(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
    this.clearData();
  }

  setData(key: string, value: any): void {
    this.dataStore.set(key, value);
  }

  getData<T = any>(key: string): T | undefined {
    return this.dataStore.get(key);
  }

  clearData(): void {
    this.dataStore.clear();
  }
}