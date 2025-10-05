import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export class EnvLoader {
  static getString(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value;
  }

  static getNumber(key: string, defaultValue?: number): number {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    const parsed = Number(value);
    if (isNaN(parsed)) {
      throw new Error(`Environment variable ${key} must be a valid number`);
    }
    return parsed;
  }

  static getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value.toLowerCase() === 'true';
  }

  static getOptionalString(key: string): string | undefined {
    return process.env[key];
  }
}