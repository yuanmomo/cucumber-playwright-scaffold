import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/custom-world';
import { AccessLogger } from '@org/common-test-cucumber-playwright';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

When('I send a GET request to {string}', async function (this: CustomWorld, url: string) {
  const requestLog = {
    url,
    method: 'GET',
  };
  
  AccessLogger.logRequest(requestLog);
  
  await this.sendHttpRequest(url, 'GET');
  
  AccessLogger.logResponse(requestLog, {
    status: this.getResponseStatus(),
    body: this.getResponseData(),
  });
});

Then('the response should match the expected JSON file {string}', async function (
  this: CustomWorld,
  filename: string
) {
  const expectedFilePath = path.join(__dirname, '../expected', filename);
  
  if (!fs.existsSync(expectedFilePath)) {
    throw new Error(`Expected file not found: ${expectedFilePath}`);
  }
  
  const expectedData = JSON.parse(fs.readFileSync(expectedFilePath, 'utf-8'));
  const actualData = this.getResponseData();
  
  expect(actualData).toEqual(expectedData);
});