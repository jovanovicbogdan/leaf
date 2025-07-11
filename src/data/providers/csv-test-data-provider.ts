import TestDataProvider from '@/data/providers/test-data-provider';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export default class CsvTestDataProvider<T> implements TestDataProvider<T> {
  async getTestData(filePath?: string): Promise<T> {
    return new Promise(resolve => {
      if (!filePath) {
        throw new Error('Please provide file path');
      }
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const records = parse(fileContents, {
        columns: true,
        skip_empty_lines: true,
      });
      return resolve(records as unknown as T);
    });
  }
}
