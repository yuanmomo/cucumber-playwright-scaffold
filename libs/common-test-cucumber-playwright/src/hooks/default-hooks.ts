import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { BaseWorld } from '../world/base-world';
import { ScenarioLogger } from '../logger/scenario-logger';
import * as fs from 'fs';
import * as path from 'path';

// 确保日志目录存在
BeforeAll(async function () {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  ScenarioLogger.log('Test suite started');
});

AfterAll(async function () {
  ScenarioLogger.log('Test suite completed');
});

Before(async function (this: BaseWorld, { pickle }) {
  ScenarioLogger.logScenarioStart(pickle.name);
  await this.init();
});

After(async function (this: BaseWorld, { pickle, result }) {
  const status = result?.status || Status.UNKNOWN;
  ScenarioLogger.logScenarioEnd(pickle.name, status);
  
  if (result?.status === Status.FAILED && this.page) {
    const screenshotPath = path.join(
      process.cwd(),
      'screenshots',
      `${pickle.name.replace(/\s+/g, '-')}-${Date.now()}.png`
    );
    const screenshotsDir = path.dirname(screenshotPath);
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    await this.page.screenshot({ path: screenshotPath });
    ScenarioLogger.log(`Screenshot saved: ${screenshotPath}`);
  }
  
  await this.cleanup();
});