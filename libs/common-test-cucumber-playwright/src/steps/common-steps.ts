import { Given, When, Then } from '@cucumber/cucumber';
import { BaseWorld } from '../world/base-world';
import { expect } from '@playwright/test';

Given('I am on the homepage', async function (this: BaseWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await this.page.goto('https://example.com');
});

When('I click on {string}', async function (this: BaseWorld, selector: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await this.page.click(selector);
});

Then('I should see {string}', async function (this: BaseWorld, text: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  const content = await this.page.content();
  expect(content).toContain(text);
});