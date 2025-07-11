import TestDataProvider from '@/data/providers/test-data-provider';
import fs from 'fs/promises';

export default class JsonTestDataProvider<T> implements TestDataProvider<T> {
  async getTestData(filePath?: string): Promise<T> {
    return new Promise(async resolve => {
      if (!filePath) {
        throw new Error('Please provide file path');
      }
      const raw = await fs.readFile(filePath, 'utf-8');
      return resolve(JSON.parse(raw) as T);
    });
  }
}
