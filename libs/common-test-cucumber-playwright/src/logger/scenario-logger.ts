import winston from 'winston';
import * as path from 'path';

const scenarioLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'scenarios.log'),
    }),
  ],
});

export class ScenarioLogger {
  static logScenarioStart(scenarioName: string): void {
    scenarioLogger.info(`========================================`);
    scenarioLogger.info(`Scenario Started: ${scenarioName}`);
    scenarioLogger.info(`========================================`);
  }

  static logScenarioEnd(scenarioName: string, status: string): void {
    scenarioLogger.info(`========================================`);
    scenarioLogger.info(`Scenario Ended: ${scenarioName} - Status: ${status}`);
    scenarioLogger.info(`========================================`);
  }

  static log(message: string): void {
    scenarioLogger.info(message);
  }
}