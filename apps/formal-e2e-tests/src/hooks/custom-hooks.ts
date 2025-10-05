import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { CustomWorld } from '../world/custom-world';
import { ScenarioLogger } from '@org/common-test-cucumber-playwright';

setWorldConstructor(CustomWorld);

Before({ tags: '@api' }, async function (this: CustomWorld) {
  ScenarioLogger.log('Custom hook: Preparing API test environment');
});

After({ tags: '@api' }, async function (this: CustomWorld) {
  ScenarioLogger.log('Custom hook: Cleaning up API test environment');
  this.apiResponse = undefined;
});

Before({ tags: '@slow' }, async function () {
  this.setTimeout(60000); // 设置超时时间为60秒
});