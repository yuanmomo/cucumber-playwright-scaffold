import { BasePage } from '@org/common-test-cucumber-playwright';
import { Page } from '@playwright/test';

export class CustomPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillLoginForm(username: string, password: string): Promise {
    await this.fill('#username', username);
    await this.fill('#password', password);
  }

  async submitForm(): Promise {
    await this.click('button[type="submit"]');
  }
}